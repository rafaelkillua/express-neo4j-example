const neo4j = require('../../database/neo4j')
const ModelNotFoundError = require('../../exceptions/ModelNotFoundError')

class HasExpertise {
  constructor ({ id, idPerson, idExpertise }) {
    this.id = id
    this.idPerson = idPerson
    this.idExpertise = idExpertise
  }

  async save () {
    const query = 'MATCH ( person:Person ), ( expertise:Expertise ) WHERE person.id = $idPerson AND expertise.id = $idExpertise CREATE ( person ) -[relation:HAS_EXPERTISE { id: $id }]-> ( expertise ) RETURN relation'
    this.id = await neo4j.queryCreateRelationship(query, this)
  }

  async delete () {
    const query = 'MATCH ()-[relation:HAS_EXPERTISE]-() WHERE relation.id = $id DELETE relation'
    await neo4j.query(query, this)
  }

  static findById (id) {
    const query = 'MATCH (person:Person)-[relation:HAS_EXPERTISE]-(expertise:Expertise) WHERE relation.id = $id RETURN relation, person, expertise LIMIT 1'
    return neo4j.queryFindRelationship(query, { id }).then(res => {
      if (res.length > 0) {
        return new HasExpertise({
          id,
          idPerson: res[0].person.properties.id,
          idExpertise: res[0].expertise.properties.id
        })
      } else {
        throw new ModelNotFoundError('Uma relação has_expertise com esse ID não foi encontrada', { id })
      }
    })
  }
}

module.exports = HasExpertise
