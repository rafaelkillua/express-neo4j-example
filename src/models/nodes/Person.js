const neo4j = require('../../database/neo4j')
const ModelNotFoundError = require('../../exceptions/ModelNotFoundError')

class Person {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }

  async save () {
    const query = 'CREATE ( newPerson:Person { id: $id, name: $name } ) RETURN newPerson'
    this.id = await neo4j.queryCreate(query, this)
  }

  async update ({ name }) {
    const query = 'MATCH ( updatedPerson:Person ) WHERE updatedPerson.id = $id SET updatedPerson.name = $name RETURN updatedPerson'
    const response = await neo4j.queryUpdate(query, { id: this.id, name })
    this.name = response.name
  }

  async delete () {
    const query = 'MATCH ( deletedPerson:Person ) WHERE deletedPerson.id = $id DELETE deletedPerson'
    await neo4j.query(query, { id: this.id })
  }

  static findAll () {
    const query = 'MATCH (allPersons:Person) RETURN allPersons'
    return neo4j.queryFind(query, null, Person)
  }

  static findByName (name) {
    const query = 'MATCH (allPersons:Person) WHERE allPersons.name CONTAINS $name RETURN allPersons'
    return neo4j.queryFind(query, { name }, Person)
  }

  static findById (id) {
    const query = 'MATCH (person:Person) WHERE person.id = $id RETURN person LIMIT 1'
    return neo4j.queryFind(query, { id }, Person).then(res => {
      if (res.length > 0) {
        return res[0]
      } else {
        throw new ModelNotFoundError('Uma pessoa com esse ID não foi encontrada', { id })
      }
    })
  }
}

module.exports = Person
