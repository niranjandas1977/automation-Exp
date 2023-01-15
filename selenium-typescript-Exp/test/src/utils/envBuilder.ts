import * as webdriver from 'selenium-webdriver'
import 'chromedriver'
import chrome from 'selenium-webdriver/chrome'

export async function getHeadLessChromeDriver(browserType: string) {
  const driver = await new webdriver.Builder()
    .forBrowser(browserType)
    .setChromeOptions(new chrome.Options().addArguments(
      '--headless',
      '--ignore-certificate-errors',
      'use-fake-device-for-media-stream',
      'use-fake-ui-for-media-stream'
      ))
    .build()
  await driver
    .manage()
    .window()
    .setRect({ x: 0, y: 0, width: 1920, height: 1080 })
  return driver
}

export async function getHeadFullChromeDriver(browserType: string) {
  const driver = await new webdriver.Builder()
    .forBrowser(browserType)
    .setChromeOptions(
      new chrome.Options().addArguments(
        '--ignore-certificate-errors',
        'use-fake-device-for-media-stream',
        'use-fake-ui-for-media-stream'
      )
    )
    .build()
  await driver.manage().window().maximize()
  return driver
}

export async function goToUrl(driver: webdriver.WebDriver, url: string) {
  await driver.get(url)
}
