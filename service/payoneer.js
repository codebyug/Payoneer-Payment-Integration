const currency = require('currency.js')
const config = require('../config')
const auth = require('./authToken')
const { sendRequest } = require('../util')
class PayoutService {
  constructor () {
    this.headers = {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  }

  /**
   * This method is used to determine required banking
   * fields for a given country, currency and payee type
   * @param {*} countryCode
   * @param {*} currencyCode
   * @param {*} payeeType
   * @returns
   */

  async bankingInfo (countryCode, currencyCode, payeeType) {
    const url = `${config.payoneerApi}/${config.programId}/payout-methods/bank` +
                `/account-types/${payeeType}/countries/${countryCode}/currencies/${currencyCode}`
    const authToken = await auth.getToken()
    const response = await sendRequest(url, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${authToken}`
      }
    })
    return response
  }

  /**
   * This method is used to check the status of a payout
   * @param {*} clientRefId
   * @returns PAYOUT STATUS
   */
  async payoutStatus (clientRefId) {
    const url = `${config.payoneerApi}/${config.programId}/payouts/${clientRefId}/status`
    const authToken = await auth.getToken()
    console.log(`[payoutStatus] authToken: ${authToken}`)
    const response = await sendRequest(url, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${authToken}`
      }
    })
    return response
  }

  /**
   * This method is used to initiate a payout
   * @param {*} request for payout
   * @returns mass payout response
   */
  async initiatePayout (req) {
    const url = `${config.payoneerApi}/${config.programId}/masspayouts`
    const authToken = await auth.getToken()
    const payload = this.framePayoutRequest(req)
    const response = await sendRequest(url, {
      method: 'POST',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(payload)
    })
    console.log(`[payout] response: ${JSON.stringify(response)}`)
    return response
  }

  /**
   * This method is used to frame the payout request
   * @param {*} req
   * @returns Array of payments for the payout request
   */
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

  /**
   * This method is used to frame the payee payout info for the payout request
   * @param {*} payee object
   *  @returns the request object to initiate payout
   */
  payeePayoutInfo (payee) {
    const { payeeId, amount, paymentCurrency, description } = payee
    const referenceId = `skilldizer-${payeeId}-${new Date().toISOString()}`
    return {
      payee_id: payeeId,
      amount: currency(amount).value,
      currency: paymentCurrency || 'USD',
      description: description || referenceId,
      client_reference_id: referenceId
    }
  }
}

module.exports = new PayoutService()
