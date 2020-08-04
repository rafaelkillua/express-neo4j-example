const { v4: uuidv4 } = require('uuid')
const neo4jDriver = require('neo4j-driver')
const ModelNotFoundError = require('../exceptions/ModelNotFoundError')

class Neo4j {
  constructor () {
    this.driver = neo4jDriver.driver(
      `bolt://${process.env.NEO4J_HOST}:${process.env.NEO4J_BOLTPORT}/${process.env.NEO4J_DATABASE}`,
      neo4jDriver.auth.basic(`${process.env.NEO4J_USERNAME}`, `${process.env.NEO4J_PASSWORD}`),
      { encrypted: 'ENCRYPTION_OFF' }
    )

    this.session = this.driver.session()
  }

  destroy () {
    this.session.close()
    this.driver.close()
  }

  query (query, params) {
    return this.session.run(query, params).then(res => {
      console.log(JSON.stringify(res.summary.query))
      return res.records
    })
  }

  queryCreate (query, params) {
    const id = uuidv4()
    return this.query(query, { ...params, id }).then(res => {
      if (!res[0]) throw new ModelNotFoundError('Não foi possível criar esse nó/relação', params)
      return id
    })
  }

  queryUpdate (query, params) {
    return this.query(query, params).then(res => res[0]._fields[0].properties)
  }

  queryFind (query, params, Model) {
    return this.query(query, params).then(res => res.map(value => value._fields.map(field => new Model({ id: field.identity.low, ...field.properties }))).flat())
  }
}

const neo4j = new Neo4j()

module.exports = neo4j
