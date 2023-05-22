require('dotenv').config()
const {
  CLIENT_ID,
  CLIENT_SECRET,
  NODE_ENV,
  OAUTH_ENDPOINT,
  PAYONEER_API,
  PROGRAM_ID,
  PORT
} = process.env

class Config {
  constructor () {
    this.NODE_ENV = NODE_ENV || 'dev'
    this.port = PORT || 8080
    this.payoneerApi = PAYONEER_API
    this.authenticationApi = OAUTH_ENDPOINT || 'https://api.sandbox.paypal.com/v1/oauth2/token'
    this.programId = PROGRAM_ID
    this.clientId = CLIENT_ID
    this.clientSecret = CLIENT_SECRET
  }
}
module.exports = new Config()
