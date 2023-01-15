import { WebDriver } from 'selenium-webdriver'
import * as basePage from '../../utils/basePage'
import { TIMEOUTS } from '../constants/timers'

const STATUS_DROPDOWN: string = "xxxxxx"
const FIRST_NAME_TEXTBOX: string = "(//input[xxxx])[2]"
const LAST_NAME_TEXTBOX: string = "(//input[xxxxx'])[2]"

export async function selectStatus(driver: WebDriver, option: string) {
  await basePage.click(
    driver,
    'statusDropDown',
    STATUS_DROPDOWN,
    TIMEOUTS.fiveSeconds
  )
  const selectOption: string = `//button[@value='${option}']`
  const description: string = `${option} Option`
  await basePage.click(driver, description, selectOption, TIMEOUTS.fiveSeconds)
}

