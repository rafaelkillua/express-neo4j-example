const neo4j = require('../../database/neo4j')
const ModelNotFoundError = require('../../exceptions/ModelNotFoundError')
const Person = require('./Person')

class Framework {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }

  async save () {
    const query = 'CREATE ( newFramework:Framework { id: $id, name: $name } ) RETURN newFramework'
    this.id = await neo4j.queryCreate(query, this)
  }

  async update ({ name }) {
    const query = 'MATCH ( updatedFramework:Framework ) WHERE updatedFramework.id = $id SET updatedFramework.name = $name RETURN updatedFramework'
    const response = await neo4j.queryUpdate(query, { id: this.id, name })
    this.name = response.name
  }

  async delete () {
    const query = 'MATCH ( deletedFramework:Framework ) WHERE deletedFramework.id = $id DELETE deletedFramework'
    await neo4j.query(query, { id: this.id })
  }

  static findAll () {
    const query = 'MATCH (allFrameworks:Framework) RETURN allFrameworks'
    return neo4j.queryFind(query, null, Framework)
  }

  static findByName (name) {
    const query = 'MATCH (allFrameworks:Framework) WHERE allFrameworks.name CONTAINS $name RETURN allFrameworks'
    return neo4j.queryFind(query, { name }, Framework)
  }

  static findById (id) {
    const query = 'MATCH (framework:Framework) WHERE framework.id = $id RETURN framework LIMIT 1'
    return neo4j.queryFind(query, { id }, Framework).then(res => {
      if (res.length > 0) {
        return res[0]
      } else {
        throw new ModelNotFoundError('Uma framework com esse ID não foi encontrada', { id })
      }
    })
  }

  getWhoWorks () {
    const query = 'MATCH ( me:Framework ) -[*2]- ( people:Person ) WHERE me.id = $id RETURN DISTINCT people'
    return neo4j.queryFind(query, this, Person)
  }
}

module.exports = Framework
