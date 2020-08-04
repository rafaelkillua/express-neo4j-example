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

}

module.exports = new PersonController()
