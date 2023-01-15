import * as webdriver from 'selenium-webdriver'
import { TIMEOUTS } from '../project1/constants/timers'
import * as fs from 'fs'

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

export async function waitForElement(
  driver: webdriver.WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
): Promise<any> {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.oneSecond)
    try {
      return await driver.findElement(webdriver.By.xpath(xpath))
    } catch (errObj: any) {
      if (errObj.name && count < LOOPCOUNT - 1) {
        continue
      }
      await driver.takeScreenshot().then(function (image) {
        fs.writeFileSync(
          `./test/screen-shots/${process.env.CASE_PREFIX}.png`,
          image,
          'base64'
        )
      })
      const errorString = `Element Name: ${desc} \nError Type: ${errObj.name} \nError Description: ${errObj.message}`
      throw errorString
    }
  }
}

export async function waitForElementTillVisible(
  driver: webdriver.WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
) {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.oneSecond)
    try {
      await driver.findElement(webdriver.By.xpath(xpath))
      return
    } catch (errObj: any) {
      if (errObj.name && count < LOOPCOUNT - 1) {
        continue
      }
      await driver.takeScreenshot().then(function (image) {
        fs.writeFileSync(
          `./test/screen-shots/${process.env.CASE_PREFIX}.png`,
          image,
          'base64'
        )
      })
      const errorString = `Element Name: ${desc} \nError Type: ${errObj.name} \nError Description: ${errObj.message}`
      throw errorString
    }
  }
}

export async function waitForElementsTillVisible(
  driver: webdriver.WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
) {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.oneSecond)
    try {
      await driver.findElements(webdriver.By.xpath(xpath))
      return
    } catch (errObj: any) {
      if (errObj.name && count < LOOPCOUNT - 1) {
        continue
      }
      await driver.takeScreenshot().then(function (image) {
        fs.writeFileSync(
          `./test/screen-shots/${process.env.CASE_PREFIX}.png`,
          image,
          'base64'
        )
      })
      const errorString = `Element Name: ${desc} \nError Type: ${errObj.name} \nError Description: ${errObj.message}`
      throw errorString
    }
  }
}

export async function waitForElementTillInvisible(
  driver: webdriver.WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
): Promise<any> {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.oneSecond)
    try {
      await driver.findElement(webdriver.By.xpath(xpath))
      continue
    } catch (errObj: any) {
      if (errObj.name && count < LOOPCOUNT - 1) {
        const message: string = `Element Name: ${desc} is now invisible.`
        console.log(message)
        return
      }
    }
  }
}

export async function waitForElementWithinParent(
  driver: webdriver.WebDriver,
  parent: webdriver.WebElement,
  desc: string,
  xpath: string,
  timeouts: number
): Promise<any> {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.oneSecond)
    try {
      return await parent.findElement(webdriver.By.xpath(xpath))
    } catch (errObj: any) {
      if (errObj.name && count < LOOPCOUNT - 1) {
        continue
      }
      await driver.takeScreenshot().then(function (image) {
        fs.writeFileSync(
          `./test/screen-shots/${process.env.CASE_PREFIX}.png`,
          image,
          'base64'
        )
      })
      const errorString = `Element Name: ${desc} \nError Type: ${errObj.name} \nError Description: ${errObj.message}`
      throw errorString
    }
  }
}

export async function waitForElementByText(
  driver: webdriver.WebDriver,
  desc: string,
  xpath: string,
  text: string,
  timeouts: number
): Promise<any> {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.fiveSeconds)
    try {
      if (
        (
          await driver.findElement(webdriver.By.xpath(xpath)).getText()
        ).includes(text)
      ) {
        return await driver.findElement(webdriver.By.xpath(xpath))
      }
    } catch (errObj: any) {
      if (errObj.name && count < LOOPCOUNT - 1) {
        continue
      }
      await driver.takeScreenshot().then(function (image) {
        fs.writeFileSync(
          `./test/screen-shots/${process.env.CASE_PREFIX}.png`,
          image,
          'base64'
        )
      })
      const errorString = `Element Name: ${desc} \nError Type: ${errObj.name} \nError Description: ${errObj.message}`
      throw errorString
    }
  }
}

export async function waitForElementByValue(
  driver: webdriver.WebDriver,
  desc: string,
  xpath: string,
  text: string,
  timeouts: number
): Promise<any> {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.fiveSeconds)
    try {
      if (
        (await driver
          .findElement(webdriver.By.xpath(xpath))
          .getAttribute('value')) === text
      ) {
        return await driver.findElement(webdriver.By.xpath(xpath))
      }
    } catch (errObj: any) {
      if (errObj.name && count < LOOPCOUNT - 1) {
        continue
      }
      await driver.takeScreenshot().then(function (image) {
        fs.writeFileSync(
          `./test/screen-shots/${process.env.CASE_PREFIX}.png`,
          image,
          'base64'
        )
      })
      const errorString = `Element Name: ${desc} \nError Type: ${errObj.name} \nError Description: ${errObj.message}`
      throw errorString
    }
  }
}

export async function waitForElements(
  driver: webdriver.WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
): Promise<any> {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  const FIRST_ELEMENT = `(${xpath})[1]`
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.oneSecond)
    try {
      if (await driver.findElement(webdriver.By.xpath(FIRST_ELEMENT))) {
        return await driver.findElements(webdriver.By.xpath(xpath))
      }
    } catch (errObj: any) {
      if (errObj.name && count < LOOPCOUNT - 1) {
        continue
      }
      await driver.takeScreenshot().then(function (image) {
        fs.writeFileSync(
          `./test/screen-shots/${process.env.CASE_PREFIX}.png`,
          image,
          'base64'
        )
      })
      const errorString = `Element Name: ${desc} \nError Type: ${errObj.name} \nError Description: ${errObj.message}`
      throw errorString
    }
  }
}

export async function waitForPageLoad(
  driver: webdriver.WebDriver,
  timeouts: number
) {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.oneSecond)
    const READY_CONDITION = driver
      .executeScript('return document.readyState')
      .toString()
      .includes('complete')
    if (READY_CONDITION || count < LOOPCOUNT - 1) {
      continue
    }
  }
}

export async function doesElementExist(
  driver: webdriver.WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
): Promise<any> {
  const LOOPCOUNT = timeouts / TIMEOUTS.oneSecond
  for (let count = 0; count < LOOPCOUNT; count += 1) {
    await driver.sleep(TIMEOUTS.oneSecond)
    try {
      await driver.findElement(webdriver.By.xpath(xpath))

      return true
    } catch (errObj: any) {
      if (errObj.name && count < LOOPCOUNT - 1) {
        continue
      }
      return false
    }
  }
}
