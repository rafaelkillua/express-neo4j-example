const RequiresExpertise = require('../models/relationships/RequiresExpertise')

class RequiresExpertiseController {
  async create (req, res) {
    try {
      const requiresExpertise = new RequiresExpertise(req.body)
      await requiresExpertise.save()
      return res.status(200).send(requiresExpertise)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      const requiresExpertise = await RequiresExpertise.findById(id)
      await requiresExpertise.delete()
      return res.status(200).send({ ...requiresExpertise, deleted: true })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }

  async findById (req, res) {
    try {
      const { id } = req.params
      const results = await RequiresExpertise.findById(id)
      return res.status(200).send(results)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }
}

module.exports = new RequiresExpertiseController()
