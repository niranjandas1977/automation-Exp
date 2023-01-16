const chalk = require('chalk')
//const playwright = require('playwright')
const { chromium } = require('playwright');
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup')

module.exports = async function() {
  console.log(chalk.green('Setup Playwright'))
  //const browser = await playwright["chromium"].launch({ headless: false, slowMo: 500, waitUntil: 'networkidle', args: ["--disable-notifications", "--start-maximized", "--start-fullscreen"] })
  const browserServer = await chromium.launchServer({headless: false, slowMo: 50, args: ["--disable-notifications", "--start-maximized", "--start-fullscreen"]});
  const wsEndpoint = await browserServer.wsEndpoint();
  const browser = await chromium.connect({ wsEndpoint });
  // This global is not available inside tests but only in global teardown
  global.__BROWSER_GLOBAL__ = browser
  // Instead, we expose the connection details via file system to be used in tests
  mkdirp.sync(DIR)
  //fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), wsEndpoint)
  global.__BROWSERSERVER_GLOBAL__ = browserServer
}

