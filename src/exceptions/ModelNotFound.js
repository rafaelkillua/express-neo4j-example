class ModelNotFound extends Error {
  constructor (message) {
    super(message)
    this.status = 404
  }
}

module.exports = ModelNotFound
