import { WebDriver } from 'selenium-webdriver'
import * as basePage from '../../../utils/basePage'
import { TIMEOUTS } from '../../constants/timers'

let CLIENTNAME = process.env.CLIENTNAME
if (CLIENTNAME.includes('WL')) {
  process.env['WL-NAME'] = CLIENTNAME.slice(3)
} else {
  process.env['WL-NAME'] = 'old-xxx'
}
const dataSet = require(`../../constants/${process.env['WL-NAME']}`)

export async function doesMainLogoExist(driver: WebDriver) {
  return await basePage.checkElementExist(
    driver,
    'Main Logo',
    `//*[contains(@class,"navbar-fixed-top")]//img[contains(@src,'${dataSet.LOGINPAGEDATA.logoFile}')][contains(@alt,'${dataSet.LOGINPAGEDATA.logoAltText}')]`,
    TIMEOUTS.thirtySeconds
  )
}

