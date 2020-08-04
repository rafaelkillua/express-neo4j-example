class ModelNotFoundError {
  constructor (message, extraData) {
    this.name = 'ModelNotFoundError'
    this.message = message
    this.status = 404
    this.date = new Date()
    this.extraData = extraData
  }
}

module.exports = ModelNotFoundError
