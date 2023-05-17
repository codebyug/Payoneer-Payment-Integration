process.env.NODE_ENV = 'automation'
const { expect } = require('chai')
const request = require('supertest')

describe('/health', () => {
  before(() => {
    this.server = require('../app')
  })
  it('should return ok', async () => {
    const response = await request(this.server).get('/health')
    expect(response.status).to.equal(200)
    expect(response.body).to.deep.equal({ status: 'OK' })
  })
})
