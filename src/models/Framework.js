const neo4j = require('../database/neo4j')
const ModelNotFoundError = require('../exceptions/ModelNotFoundError')

class Framework {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }

  async save () {
    const query = 'CREATE ( newFramework:Framework { name: $name } ) RETURN newFramework'
    this.id = await neo4j.queryCreate(query, this)
  }

  async update ({ name }) {
    const query = `MATCH ( updatedFramework:Framework ) WHERE ID(updatedFramework) = ${this.id} SET updatedFramework.name = $name RETURN updatedFramework`
    const response = await neo4j.queryUpdate(query, { name })
    this.name = response.name
  }

  async delete () {
    const query = `MATCH ( deletedFramework:Framework ) WHERE ID(deletedFramework) = ${this.id} DELETE deletedFramework`
    await neo4j.queryDelete(query)
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
    const query = `MATCH (framework:Framework) WHERE ID(framework) = ${id} RETURN framework LIMIT 1`
    return neo4j.queryFind(query, null, Framework).then(res => {
      if (res.length > 0) {
        return res[0]
      } else {
        throw new ModelNotFoundError('Uma framework com esse ID não foi encontrada', { id })
      }
    })
  }
}

module.exports = Framework
