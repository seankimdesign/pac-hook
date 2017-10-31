const path = require('path')
const fs = require('fs')

const APP_CONST = require('./constants')

const writeLog = (fileName, message) => new Promise((resolve, reject) => {
  const filePath = path.resolve(__dirname, APP_CONST.log_path, fileName)
  fs.access(filePath, 'wx', (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFile(filePath, message, (err) => {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            console.log('> written to new log file')
            resolve()
          }
        })
      } else {
        console.log(err)
        console.log(err.code)
        reject(err)
      }
    } else {
      fs.appendFile(filePath, message, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          console.log('> appended log file')
          resolve()
        }
      })
    }
  })
})
exports.writeLog = writeLog
