const HasExpertise = require('../models/relationships/HasExpertise')

class HasExpertiseController {
  async create (req, res) {
    try {
      const hasExpertise = new HasExpertise(req.body)
      await hasExpertise.save()
      return res.status(200).send(hasExpertise)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      const hasExpertise = await HasExpertise.findById(id)
      await hasExpertise.delete()
      return res.status(200).send({ ...hasExpertise, deleted: true })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }

  async findById (req, res) {
    try {
      const { id } = req.params
      const results = await HasExpertise.findById(id)
      return res.status(200).send(results)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }
}

module.exports = new HasExpertiseController()
