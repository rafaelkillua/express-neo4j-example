const Person = require('../models/Person')

class PersonController {
  async create (req, res) {
    try {
      const person = new Person(req.body)
      await person.save()
      return res.status(200).send(person)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async update (req, res) {
    try {
      const { id } = req.params
      const person = await Person.findById(id)
      await person.update(req.body)
      return res.status(200).send(person)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      const person = await Person.findById(id)
      await person.delete()
      return res.status(200).send({ ...person, deleted: true })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }

  async find (req, res) {
    try {
      const { name } = req.query
      const results = name ? await Person.findByName(name) : await Person.findAll()
      return res.status(200).send(results)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  }

  async findById (req, res) {
    try {
      const { id } = req.params
      const results = await Person.findById(id)
      return res.status(200).send(results)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).send(error)
    }
  }
}

module.exports = new PersonController()
