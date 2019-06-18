module.exports = {
  verbose: true,

  // Setting testURL is to make this error go away: https://github.com/jsdom/jsdom/issues/2304
  testURL: 'http://testing-is-cool.amida-demo.com/',

  setupFiles: ['./test/_setup.js'],

  // Since we use webpack's "alias" feature in webpack.config.js, and we therefore have import
  // statements with paths like `import authApi from 'services/authApi'` throughout the code,
  // we have to make Jest understand these shorthand file paths.
  // And since we create these, we can use the same shorthand paths directly in our test files.
  moduleNameMapper: {
    '^config(.*)': '<rootDir>/src/config$1'
  }
}
