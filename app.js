const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')
require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

fs.readdir(`${__dirname}/src/routes`, (err, files) => {
  if (err) {
    throw new Error(`error on load routes: ${err}`)
  }
  files.forEach(file => {
    const module = require(`${__dirname}/src/routes/${file}`)
    app.use('/', module)
  })
})

module.exports = app
