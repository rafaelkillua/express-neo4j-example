const IsTeammate = require('../models/relationships/IsTeammate')

class IsTeammateController {
  async create (req, res) {
    try {
      const isTeammate = new IsTeammate(req.body)
      await isTeammate.save()
      return res.status(200).send(isTeammate)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      const isTeammate = await IsTeammate.findById(id)
      await isTeammate.delete()
      return res.status(200).send({ ...isTeammate, deleted: true })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }

  async findById (req, res) {
    try {
      const { id } = req.params
      const results = await IsTeammate.findById(id)
      return res.status(200).send(results)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }
}

module.exports = new IsTeammateController()
