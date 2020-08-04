const neo4j = require('../database/neo4j')
const ModelNotFoundError = require('../exceptions/ModelNotFoundError')

class Person {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }

  async save () {
    const query = 'CREATE ( newPerson:Person { name: $name } ) RETURN newPerson'
    this.id = (await neo4j.queryCreate(query, this))
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
    const query = `MATCH (person:Person) WHERE ID(person) = ${id} RETURN person LIMIT 1`
    return neo4j.queryFind(query, null, Person).then(res => {
      if (res.length > 0) {
        return res[0]
      } else {
        throw new ModelNotFoundError('Uma pessoa com esse ID não foi encontrada', { id })
      }
    })
  }
}

module.exports = Person
