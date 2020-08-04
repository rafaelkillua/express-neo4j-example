const neo4jDriver = require('neo4j-driver')

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
    return this.query(query, params).then(res => res[0]._fields[0].identity.low)
  }

  queryUpdate (query, params) {
    return this.query(query, params).then(res => res[0]._fields[0].properties)
  }

  queryDelete (query) {
    return this.query(query)
  }

  queryFind (query, params, Model) {
    return this.query(query, params).then(res => res.map(value => value._fields.map(field => new Model({ id: field.identity.low, ...field.properties }))).flat())
  }
}

const neo4j = new Neo4j()

module.exports = neo4j
