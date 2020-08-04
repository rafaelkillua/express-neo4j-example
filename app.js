const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

const indexRouter = require('./src/routes/index')
const personRouter = require('./src/routes/person')
const expertiseRouter = require('./src/routes/expertise')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/', personRouter)
app.use('/', expertiseRouter)

module.exports = app
