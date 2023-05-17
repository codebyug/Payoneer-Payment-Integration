require('dotenv').config()
const { PORT, NODE_ENV, PAYOUT_API } = process.env


class Config {
  constructor () {
    this.NODE_ENV = NODE_ENV || 'dev'
    this.port = PORT || 8080
    this.payoutApi = PAYOUT_API
  }
}
module.exports = new Config()
