const healthController = require('./healthControllerService')

module.exports.healthCheck = (req, res, next) => {
  healthController.healthCheck(req.swagger.params, res, next)
}
