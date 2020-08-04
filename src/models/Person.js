const neo4j = require('../database/neo4j')
class Person {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }

  async save () {
    const query = 'CREATE ( newPerson:Person { name: $name } ) RETURN newPerson'
    this.id = (await neo4j.queryCreate(query, this))
  }

}

module.exports = Person
