const Person = require('../models/nodes/Person')

class ReportsController {
  async getTeammates (req, res) {
    try {
      const { id } = req.params
      const person = await Person.findById(id)
      const teammates = await person.getTeammates()
      return res.status(200).send(teammates)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }
}

module.exports = new ReportsController()
