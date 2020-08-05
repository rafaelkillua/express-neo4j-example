const Person = require('../models/nodes/Person')
const Expertise = require('../models/nodes/Expertise')
const Framework = require('../models/nodes/Framework')

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

  async getWhoHasExpertise (req, res) {
    try {
      const { id } = req.params
      const expertise = await Expertise.findById(id)
      const whoHasExpertise = await expertise.getWhoHas()
      return res.status(200).send(whoHasExpertise)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async getWhoWorksWithFramework (req, res) {
    try {
      const { id } = req.params
      const framework = await Framework.findById(id)
      const whoWorksExpertise = await framework.getWhoWorks()
      return res.status(200).send(whoWorksExpertise)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }
}

module.exports = new ReportsController()
