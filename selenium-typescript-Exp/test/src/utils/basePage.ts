import { WebDriver, WebElement } from 'selenium-webdriver'
import * as waitObj from './waits'

export async function getElement(
  driver: WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
) {
  const elem: WebElement = await waitObj.waitForElement(
    driver,
    desc,
    xpath,
    timeouts
  )
  return elem
}

export async function getElementWithinParentObject(
  driver: WebDriver,
  parent: WebElement,
  desc: string,
  xpath: string,
  timeouts: number
) {
  const elem: WebElement = await waitObj.waitForElementWithinParent(
    driver,
    parent,
    desc,
    xpath,
    timeouts
  )
  return elem
}

export async function getElements(
  driver: WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
) {
  const elements: WebElement[] = await waitObj.waitForElements(
    driver,
    desc,
    xpath,
    timeouts
  )
  return elements
}

export async function waitForElementToAppear(
  driver: WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
) {
  await waitObj.waitForElementTillVisible(driver, desc, xpath, timeouts)
}

export async function waitForElementsToAppear(
  driver: WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
) {
  await waitObj.waitForElementsTillVisible(driver, desc, xpath, timeouts)
}

export async function syncWithElementByText(
  driver: WebDriver,
  desc: string,
  xpath: string,
  text: string,
  timeouts: number
) {
  const element: WebElement = await waitObj.waitForElementByText(
    driver,
    desc,
    xpath,
    text,
    timeouts
  )
  return element
}

export async function syncWithElementByValue(
  driver: WebDriver,
  desc: string,
  xpath: string,
  text: string,
  timeouts: number
) {
  const element: WebElement = await waitObj.waitForElementByValue(
    driver,
    desc,
    xpath,
    text,
    timeouts
  )
  return element
}

export async function syncWithElementTillInvisible(
  driver: WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
) {
  await waitObj.waitForElementTillInvisible(
    driver,
    desc,
    xpath,
    timeouts
  )
}

export async function checkElementExist(
  driver: WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
) {
  return await waitObj.doesElementExist(driver, desc, xpath, timeouts)
}

export async function click(
  driver: WebDriver,
  desc: string,
  xpath: string,
  timeouts: number
) {
  const elem = await getElement(driver, desc, xpath, timeouts)
  await elem.click()
}

export async function fill(
  driver: WebDriver,
  desc: string,
  xpath: string,
  text: string,
  timeouts: number
) {
  const elem = await getElement(driver, desc, xpath, timeouts)
  await elem.clear()
  await elem.sendKeys(text)
}

export async function getBoundaryValueOfElement(
  driver: WebDriver,
  desc: string,
  css: string,
) {
  try{
    await driver.executeScript(
      `return document.querySelector("${css}").getBoundingClientRect().top`
    )
  } catch (errObj: any) {
    const errorString = `Element Name: ${desc} \nError Type: ${errObj.name} \nError Description: ${errObj.message}`
    throw errorString
  }
  
}

export async function hover(driver: WebDriver, element: WebElement) {
  const actions = driver.actions({ bridge: true })
  await actions.move({ origin: element }).perform()
}

export async function hoverAndClick(driver: WebDriver, hoverElement: WebElement, clickElement: WebElement) {
  const actions = driver.actions({ bridge: true })
  await actions.move({ origin: hoverElement }).click(clickElement).perform()
}

export async function dragAndDropByOffset(driver: WebDriver, element: WebElement, offsetObject: object) {
  const actions = driver.actions({ bridge: true })
  await actions.dragAndDrop(element, offsetObject).perform()
}

export async function refreshBrowser(driver: WebDriver) {
  driver.navigate().refresh()
}

export async function waitForPageLoad(
  driver: WebDriver,
  timeouts: number
) {
  await waitObj.waitForPageLoad(driver, timeouts)
}

export async function switchToDefaultWindow(
  driver: WebDriver,
) {
  const windowHandles = await driver.getWindowHandle()
  await driver.switchTo().window(windowHandles[0])
}

export async function switchToLastWindow(
  driver: WebDriver,
) {
  const windowHandles = await driver.getWindowHandle()
  await driver.switchTo().window(windowHandles[windowHandles.length])
}