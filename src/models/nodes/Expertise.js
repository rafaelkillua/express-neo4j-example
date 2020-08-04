const neo4j = require('../../database/neo4j')
const ModelNotFoundError = require('../../exceptions/ModelNotFoundError')

class Expertise {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }

  async save () {
    const query = 'CREATE ( newExpertise:Expertise { name: $name } ) RETURN newExpertise'
    this.id = await neo4j.queryCreate(query, this)
  }

  async update ({ name }) {
    const query = `MATCH ( updatedExpertise:Expertise ) WHERE ID(updatedExpertise) = ${this.id} SET updatedExpertise.name = $name RETURN updatedExpertise`
    const response = await neo4j.queryUpdate(query, { name })
    this.name = response.name
  }

  async delete () {
    const query = `MATCH ( deletedExpertise:Expertise ) WHERE ID(deletedExpertise) = ${this.id} DELETE deletedExpertise`
    await neo4j.queryDelete(query)
  }

  static findAll () {
    const query = 'MATCH (allExpertises:Expertise) RETURN allExpertises'
    return neo4j.queryFind(query, null, Expertise)
  }

  static findByName (name) {
    const query = 'MATCH (allExpertises:Expertise) WHERE allExpertises.name CONTAINS $name RETURN allExpertises'
    return neo4j.queryFind(query, { name }, Expertise)
  }

  static findById (id) {
    const query = `MATCH (expertise:Expertise) WHERE ID(expertise) = ${id} RETURN expertise LIMIT 1`
    return neo4j.queryFind(query, null, Expertise).then(res => {
      if (res.length > 0) {
        return res[0]
      } else {
        throw new ModelNotFoundError('Uma expertise com esse ID não foi encontrada', { id })
      }
    })
  }
}

module.exports = Expertise
