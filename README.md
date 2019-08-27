# qtc-web-ui

# Environment Variables

Environment variables are applied in this order, with the former overwritten by the latter:

1. Default values, which are set automatically by [joi](https://github.com/hapijs/joi) within `config.js`, even if no such environment variable is specified whatsoever.
2. Variables specified by the `.env` file.
3. Variables specified via the command line.

Variables are listed below in this format:

##### `VARIABLE_NAME` (Required (if it actually is)) [`the default value`]

A description of what the variable is or does.
- A description of what to set the variable to, whether that be an example, or what to set it to in development or production, or how to figure out how to set it, etc.
- Perhaps another example value, etc.

##### `NODE_ENV` (Required)

You never need to manually set this. The various `package.json` scripts set this for you.
- Valid values are `production`, `development`, and `test`.

##### `QTC_WEB_UI_PORT` (Required) [`1776`]

The port the express server that serves this app.

##### `APPLICATION_PRESENTATION_NAME` (Required) [`QTC Web UI`]

The name of the application, as it will be displayed in the web application.

# Local Development Install / Setup / Run

## Dependencies

### Node.js

Node v10.9.0 is recommended.

You must use node.js v10.3.0 or greater (which uses npm v6.x). This is because npm v6.x changes the way it writes package-lock.json files. If you wanted to update package versions by deleting package-lock.json, and you did so with npm < v6.x, it would mess up the file.

## Local Install

```
npm install
cp .env.example.env .env
```

## Local Test

Running the test suite on your local machine is not supported. See the [Docker Test](#Docker-Test) section.

## Local Run

### Development

This will start the server with `NODE_ENV` and the [Webpack mode](https://webpack.js.org/concepts/mode/) set to `development`, which will enable development-related features/tools such as HMR.

```
npm start
```

### Production (locally)

This will create the production build and start the server with NODE_ENV and webpack mode set to "production". It is useful if you want to run the production code (minified, etc.) locally:

```
npm run build-prod-start
```

# Test

```
npm test
```

By default--without specifying where the test files are--Jest will run all all files named `*.test.js`

To specify a specific test file to run, pass the file name (assuming the file is located somewhere under `test/` directory) into the npm script like this:

```
npm test -- test/something/somefile.test.js
```

# Docker

## Docker Build

```
docker build -t amidatech/orange-web:latest {YOUR_ORANGE_WEB_DIRECTORY}
```

## Docker Test

In order for the test environment to be consistant across development environments, the test suite is intended to run inside a docker container. Running the test suite on your local machine is not supported, though it will probably work.

Note: The -t attaches your terminal to the docker container's terminal. The effect this has is to make the container's terminal colors display in your terminal. The command works the same without the -t, you just don't get any nice terminal colors.


```
docker run --rm -t -v "$(pwd)/.env.test-cluster.env:/app/.env" \
--name orange-web amidatech/orange-web \
npm run test
```

## Docker Run

```
docker run -p 1776:1776 -v "$(pwd)/{YOUR_ENV_FILE}:/app/.env" \
--name orange-web amidatech/orange-web
```
