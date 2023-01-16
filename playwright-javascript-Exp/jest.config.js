module.exports = {
    globalSetup: './setup.js',
    globalTeardown: './teardown.js',
    testEnvironment: './playwright_environment.js',
    reporters: ["default", ["./node_modules/jest-html-reporter", {pageTitle: "My Test Report", append:true}]]
  }