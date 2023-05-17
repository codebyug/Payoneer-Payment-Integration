module.exports.healthCheck = (req, res, next) => {
  res.send({
    status: 'OK'
  })
}
