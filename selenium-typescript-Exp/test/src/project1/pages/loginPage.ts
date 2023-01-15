import { WebDriver } from 'selenium-webdriver'
import * as loginComponents from '../components/Login'

export async function doesWelcomeTextExist(driver: WebDriver) {
  return loginComponents.doesWelcomeTextComponentExist(driver)
}
