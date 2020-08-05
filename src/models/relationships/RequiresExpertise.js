const neo4j = require('../../database/neo4j')
const ModelNotFoundError = require('../../exceptions/ModelNotFoundError')

class RequiresExpertise {
  constructor ({ id, idFramework, idExpertise }) {
    this.id = id
    this.idFramework = idFramework
    this.idExpertise = idExpertise
  }

  async save () {
    const query = 'MATCH ( framework:Framework ), ( expertise:Expertise ) WHERE framework.id = $idFramework AND expertise.id = $idExpertise CREATE ( framework ) -[relation:REQUIRES_EXPERTISE { id: $id }]-> ( expertise ) RETURN relation'
    this.id = await neo4j.queryCreateRelationship(query, this)
  }

  async delete () {
    const query = 'MATCH ()-[relation:REQUIRES_EXPERTISE]-() WHERE relation.id = $id DELETE relation'
    await neo4j.query(query, this)
  }

  static findById (id) {
    const query = 'MATCH (framework:Framework)-[relation:REQUIRES_EXPERTISE]-(expertise:Expertise) WHERE relation.id = $id RETURN relation, framework, expertise LIMIT 1'
    return neo4j.queryFindRelationship(query, { id }).then(res => {
      if (res.length > 0) {
        return new RequiresExpertise({
          id,
          idFramework: res[0].framework.properties.id,
          idExpertise: res[0].expertise.properties.id
        })
      } else {
        throw new ModelNotFoundError('Uma relação requires_expertise com esse ID não foi encontrada', { id })
      }
    })
  }
}

module.exports = RequiresExpertise
