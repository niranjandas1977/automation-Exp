import * as sql from 'mssql'
import axios from 'axios'
// import * as dotenv from 'dotenv'
// dotenv.config({ path: '../.env' })
const dotenv = require('dotenv').config()
// const DBSERVERNAME: any = process.env.DBSERVERNAME
// const DBUSERID: any = process.env.DBUSERID
// const DBPASSWORD: any = process.env.DBPASSWORD
// const DBCATALOG: any = process.env.DBCATALOG

async function sqlDelete(userId: string) {
  const DBSERVERNAME: string = 'tcp:xxxxxxxxxxxxxxxxxxx'
  const DBUSERID: string =
    'xxxxxxxxxxxxxxxxxxx'
  const DBPASSWORD: string = 'xxxxxxxxxxxxxxxxxxx'
  const DBCATALOG: string = 'xxxxxxxxxxxxxxxxxxx'
  try {
    await sql.connect(
      `Server=${DBSERVERNAME},1433;Persist Security Info=False;User ID=${DBUSERID};Password=${DBPASSWORD};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Initial Catalog=${DBCATALOG}`
    )

    const result = await sql.query`DECLARE @userId nvarchar(128) = ${userId}
    DELETE FROM accounts.UserGroupMap
    where User_Id = @userId
    DELETE FROM accounts.Aspxxxxx
    where UserId = @userId
    where Id = @userId`
    console.log('Hello : ---- ', result)
  } catch (err) {
    console.log(err)
  }
}
async function login() {
  var data = JSON.stringify({
    grant_type: 'password',
    username: 'xxxxxxxxxxxxxxxxxxx',
    password: 'xxxxxxx',
  })
  var loginConfig = {
    method: 'post',
    url: 'https://xxxxxxxxxxxxxxxxxxx/api/token',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }
  try {
    const response = await axios(loginConfig)
    return JSON.stringify(response.data.access_token)
  } catch (error) {
    console.log(error)
  }
}

export async function cleanUser() {
  const token = await login()
  var userConfig = {
    method: 'get',
    url: 'https://xxxxxxxxxxxxxxxxxxx/api/users?sourcePartnerId=&limit=100&page=0&search=&groupName=&status=',
    headers: {
      Cookie: `token=${token}`,
    },
  }

  try {
    const response = (await axios(userConfig)) as any
    for (var item of response.data) {
      if (item['LastName'].includes('auto')) {
        await sqlDelete(item['Id'])
      }
    }
  } catch (e) {
    console.log(e)
  }

  // return axios(userConfig)
  //   .then(async function (response: any) {
  //     for (var item of response.data) {
  //       if (item['LastName'].includes('auto')) {
  //         await sqlDelete(item['Id'])
  //       }
  //     }
  //   })
  //   .catch(function (error: any) {
  //     console.log(error)
  //   })
}
