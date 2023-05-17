const payoutService = require('../service/payoneer')

module.exports.payout = async (req, res, next) => {
  try {
    console.log(`[payout] request: ${JSON.stringify(req.body)}`)
    const response = await payoutService.initiatePayout(req)
    res.status(200).send({ response })
  } catch (err) {
    console.log(err)
    res.status(err.status || 500).send({ error: err.message })
  }
}

module.exports.getPayoutStatus = async (req, res, next) => {
  try {
    const params = req.swagger.params
    const clientRefId = params.clientRefId.value
    console.log(`[payoutStatus] request: ${clientRefId}`)
    const response = await payoutService.payoutStatus(clientRefId)
    res.status(200).send({ response })
  } catch (err) {
    console.log(err)
    res.status(err.status || 500).send({ error: err.message })
  }
}
