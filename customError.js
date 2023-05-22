module.exports.InvalidRequest = class extends Error {
  constructor (message) {
    super()
    this.name = 'InvalidRequest'
    this.message = message || 'Invalid request'
    this.status = 400
  }
}

module.exports.InternalServerError = class extends Error {
  constructor (message) {
    super()
    this.name = 'Internal Server Error'
    this.message = message || 'Internal Server Error'
    this.status = 500
  }
}

module.exports.ResourceNotFound = class extends Error {
  constructor (message) {
    super()
    this.name = 'ResourceNotFound'
    this.message = message || 'Resource not found'
    this.status = 404
  }
}

module.exports.Unauthorized = class extends Error {
  constructor (message) {
    super()
    this.name = 'Unauthorized'
    this.message = message || 'Unauthorized'
    this.status = 401
  }
}
