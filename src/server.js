const { NODE_ENV } = process.env
if (NODE_ENV !== 'development' && NODE_ENV !== 'production') {
  throw new Error('server.js: NODE_ENV must === either "development" or "production", but it is neither.')
}

const serverConfig = require('./config/serverConfig')
if (!serverConfig.port) {
  throw new Error(`server.js: serverConfig.port is falsy (specifically, it is ${serverConfig.port}). This probably happened because environment variable ORANGE_WEB_PORT is not defined. Are you sure your .env file exists and has correct contents?`)
}

const bundleConfig = require('./config/bundleConfig')

const express = require('express')
const cookieParser = require('cookie-parser')
const expressWinston = require('express-winston')
const winstonInstance = require('./config/winston')

let path, webpack, webpackDevMiddleware, webpackHotMiddleware
if (NODE_ENV === 'production') {
  path = require('path')
}
else if (NODE_ENV === 'development') {
  webpack = require('webpack')
  webpackDevMiddleware = require('webpack-dev-middleware')
  webpackHotMiddleware = require('webpack-hot-middleware')
}

// Ignoring, momentarily, the nuance added by authenticated vs unauthenticated
// requests for private or public resources, the desired request handling behavior
// is:
// (1) If the request has a dot (.) in it (including index.html), assume it is for
//     an asset/file. Therefore,
//   (a) If that asset exists, return it
//   (b) If that asset does not exist, return 404.
// (2) If the request is for root path "/", return index.html (like a normal web server does).
// (3) If the request is for /any/path/that/is/not/an/asset, since this is a single-page
//     application (SPA), return index.html and let react-router determine whether to
//     display a 404 message to the user or not.
// Lastly, in order to be able to use webpackDevMiddleware, we cannot anywhere use express's
// sendFile(public/index.html) (or private/index.html), because, in development, we won't have
// access to public/index.html, as it exists only in memory (see webpackDevMiddleware documentation).
// Instead, rewrite the request to public/index.html and pass the request to webpackDevMiddleware.
// This is why this server repeatedly uses (in different circumstances) the pattern of
// app.use(something that rewrites the path) then app.use(static serving middleware)

const app = express()

// Matches any path that does not have a dot (.) in it
const hasNoDot = /^[^.]*$/

let webpackConfig, compiler, devMiddleware, staticMiddleware, privateStaticMiddleware
if (NODE_ENV === 'development') {
  webpackConfig = require('../webpack.config.js')
  compiler = webpack(webpackConfig)
  devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  })
}
else if (NODE_ENV === 'production') {
  // When NODE_ENV==='production', this file should only be run from the dist/
  // dir (not the src/ dir). Therefore, these paths are relative to dist/
  staticMiddleware = express.static(path.join(__dirname, 'public'))
}

if (NODE_ENV === 'development') {
  app.use(webpackHotMiddleware(compiler))
}

app.use(cookieParser())

if (NODE_ENV === 'development' || NODE_ENV === 'production') {
  expressWinston.requestWhitelist = ['url', 'method', 'httpVersion', 'originalUrl', 'query']
  expressWinston.responseWhitelist = ['statusCode', 'responseTime']
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }))
}

// This handles case (3) and prepares case (1)(a) for handling later in the middleware stack.
app.use(async (req, res, next) => {
  if (req.path.match(hasNoDot)) {
    // Yes, we always want to rewrite /any/path/that/does/not/have/a/dot/in/the/name to 
    // public/index.html
    // This is because we don't want the server to know what is a valid path or not--we only want
    // to have to code valid routes into react-router in /public/index.bundle.js
    req.url = '/public/index.html'

    res.setHeader('Set-Cookie', `qtcWebUiConfig=${JSON.stringify(bundleConfig)}; path=/`)
  }
  next()
})

// Handle case (1)(a) and (2)
if (NODE_ENV === 'development') {
  app.use(devMiddleware)
}
else if (NODE_ENV === 'production') {
  app.use('/public', staticMiddleware)
}

// The request will only reach this point in the middleware sequence if it wasn't 
// /any/path/that/does/not/have/a/dot/in/the/name and it wasn't a static asset that exists.
// This handles case (1)(b). Note that this is only intended to handle 404/not-found cases.
// The path is redirected to public/index.html because, if the user enters
// /some/file/that/does/not/exist.something in their URL bar, they will get an index.html
// which  displays a nice error message to the user.
app.use(async (req, res, next) => {
  req.url = '/public/index.html'
  res.status(404)
  next()
})
if (NODE_ENV === 'development') {
  app.use(devMiddleware)
}
else if (NODE_ENV === 'production') {
  app.use('/public', staticMiddleware)
}

// Log errors.
if (NODE_ENV !== 'test') {
  app.use((err, req, res, next) => {
    winstonInstance.warn(err)
    return next(err)
  })
}

app.listen(serverConfig.port, (err) => {
  if (err) {
    winstonInstance.error('Error starting server:')
    winstonInstance.error(err)
    process.exit(1)
  }
  winstonInstance.info(`Server listening on port ${serverConfig.port}`)
})
