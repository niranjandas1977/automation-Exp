import { WebDriver } from 'selenium-webdriver'
import * as loginPageComponents from '../components/login'

export async function verifyMainLogoExist(driver: WebDriver) {
  return await loginPageComponents.doesMainLogoExist(driver)
}
