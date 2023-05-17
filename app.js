const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const oasTools = require('oas-tools')
const jsyaml = require('js-yaml')
const fs = require('fs')
const rateLimit = require('express-rate-limit')

const config = require('./config')

const spec = fs.readFileSync(path.join(__dirname, 'api/oas-doc.yaml'), 'utf8')
const oasDoc = jsyaml.safeLoad(spec)
const app = express()
const serverPort = config.port
const apiOptions = {
  controllers: path.join(__dirname, './controllers'),
  loglevel: 'info',
  strict: true,
  router: true,
  validator: true,
  ignoreUnknownFormats: false
}
oasTools.configure(apiOptions)

// Configure express app
app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
})

app.post('*', limiter, (req, res, next) => {
  console.log('in rate limiter')
  next()
})

app.use(limiter)

// Start app with open api server middleware
oasTools.initialize(oasDoc, app, () => {
  app.listen(serverPort, () => {
    console.log('App running at http://localhost:' + serverPort)
    console.log('________________________________________________________________')
    if (apiOptions.docs !== false) {
      console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs')
      console.log('________________________________________________________________')
    }
  })
})

function exitHandler (options) {
  if (options.exit) process.exit()
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }))

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }))

module.exports = app
