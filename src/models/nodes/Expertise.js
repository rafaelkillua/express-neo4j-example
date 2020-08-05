const neo4j = require('../../database/neo4j')
const ModelNotFoundError = require('../../exceptions/ModelNotFoundError')
const Person = require('./Person')

class Expertise {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }

  async save () {
    const query = 'CREATE ( newExpertise:Expertise { id: $id, name: $name } ) RETURN newExpertise'
    this.id = await neo4j.queryCreate(query, this)
  }

  async update ({ name }) {
    const query = 'MATCH ( updatedExpertise:Expertise ) WHERE updatedExpertise.id = $id SET updatedExpertise.name = $name RETURN updatedExpertise'
    const response = await neo4j.queryUpdate(query, { id: this.id, name })
    this.name = response.name
  }

  async delete () {
    const query = 'MATCH ( deletedExpertise:Expertise ) WHERE deletedExpertise.id = $id DELETE deletedExpertise'
    await neo4j.query(query, { id: this.id })
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
    const query = 'MATCH (expertise:Expertise) WHERE expertise.id = $id RETURN expertise LIMIT 1'
    return neo4j.queryFind(query, { id }, Expertise).then(res => {
      if (res.length > 0) {
        return res[0]
      } else {
        throw new ModelNotFoundError('Uma expertise com esse ID não foi encontrada', { id })
      }
    })
  }

  getWhoHas () {
    const query = 'MATCH ( me:Expertise ) <-[ :HAS_EXPERTISE ]- ( people:Person ) WHERE me.id = $id RETURN DISTINCT people'
    return neo4j.queryFind(query, this, Person)
  }
}

module.exports = Expertise
