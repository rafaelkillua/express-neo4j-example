const Expertise = require('../models/nodes/Expertise')

class ExpertiseController {
  async create (req, res) {
    try {
      const expertise = new Expertise(req.body)
      await expertise.save()
      return res.status(200).send(expertise)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async update (req, res) {
    try {
      const { id } = req.params
      const expertise = await Expertise.findById(id)
      await expertise.update(req.body)
      return res.status(200).send(expertise)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      const expertise = await Expertise.findById(id)
      await expertise.delete()
      return res.status(200).send({ ...expertise, deleted: true })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }

  async find (req, res) {
    try {
      const { name } = req.query
      const results = name ? await Expertise.findByName(name) : await Expertise.findAll()
      return res.status(200).send(results)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async findById (req, res) {
    try {
      const { id } = req.params
      const results = await Expertise.findById(id)
      return res.status(200).send(results)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }
}

module.exports = new ExpertiseController()
