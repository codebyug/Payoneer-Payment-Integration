const fetch = require('node-fetch')
const config = require('../config')

class PayoutService {
  constructor () {
    this.url = config.payoutApi
    this.headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${config.payoutApiToken}`
    }
  }

  async payoutStatus (clientRefId) {
    const response = await fetch(`${this.url}/${clientRefId}`, {
      method: 'GET',
      headers: this.headers
    })
    return response.json()
  }

  async initiatePayout (req) {
    const payload = this.framePayoutRequest(req)
    const response = await fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload)
    })
    return response.json()
  }

  framePayoutRequest (req) {
    const { payouts } = req.body
    const payments = []
    for (const payee of payouts) {
      payments.push(this.payeePayoutInfo(payee))
    }
    return {
      Payments: payments
    }
  }

  payeePayoutInfo (payee) {
    const { payeeId, amount, currency, description } = payee
    const referenceId = `skilldizer-${payeeId}-${new Date().toISOString()}`
    return {
      payee_id: payeeId,
      amount,
      currency,
      description: description || referenceId,
      client_reference_id: referenceId
    }
  }
}
module.exports = new PayoutService()
