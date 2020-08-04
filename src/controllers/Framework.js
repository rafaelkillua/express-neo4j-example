const Framework = require('../models/Framework')

class FrameworkController {
  async create (req, res) {
    try {
      const framework = new Framework(req.body)
      await framework.save()
      return res.status(200).send(framework)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async update (req, res) {
    try {
      const { id } = req.params
      const framework = await Framework.findById(id)
      await framework.update(req.body)
      return res.status(200).send(framework)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      const framework = await Framework.findById(id)
      await framework.delete()
      return res.status(200).send({ ...framework, deleted: true })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }

  async find (req, res) {
    try {
      const { name } = req.query
      const results = name ? await Framework.findByName(name) : await Framework.findAll()
      return res.status(200).send(results)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async findById (req, res) {
    try {
      const { id } = req.params
      const results = await Framework.findById(id)
      return res.status(200).send(results)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }
}

module.exports = new FrameworkController()
