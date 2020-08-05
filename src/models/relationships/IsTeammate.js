const neo4j = require('../../database/neo4j')
const ModelNotFoundError = require('../../exceptions/ModelNotFoundError')

class IsTeammate {
  constructor ({ id, idPersonA, idPersonB }) {
    this.id = id
    this.idPersonA = idPersonA
    this.idPersonB = idPersonB
  }

  async save () {
    const query = 'MATCH ( personA:Person ), ( personB:Person ) WHERE personA.id = $idPersonA AND personB.id = $idPersonB CREATE ( personA ) -[relation1:IS_TEAMMATE { id: $id }]-> ( personB ), ( personA ) <-[relation2:IS_TEAMMATE { id: $id2 }]- ( personB ) RETURN relation1, relation2'
    this.id = await neo4j.queryCreateRelationship(query, this, true)
  }

  async delete () {
    const query = 'MATCH ()-[relation:IS_TEAMMATE]-() WHERE relation.id = $id DELETE relation'
    await neo4j.query(query, this)
  }

  static findById (id) {
    const query = 'MATCH (personA:Person)-[relation:IS_TEAMMATE]-(personB:Person) WHERE relation.id = $id RETURN relation, personA, personB LIMIT 1'
    return neo4j.queryFindRelationship(query, { id }).then(res => {
      if (res.length > 0) {
        return new IsTeammate({
          id,
          idPersonA: res[0].personA.properties.id,
          idPersonB: res[0].personB.properties.id
        })
      } else {
        throw new ModelNotFoundError('Uma relação teammate com esse ID não foi encontrada', { id })
      }
    })
  }
}

module.exports = IsTeammate
