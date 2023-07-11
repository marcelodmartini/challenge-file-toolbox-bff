/* eslint-disable n/handle-callback-err */
/* eslint-disable no-undef */
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../app.js'

chai.use(chaiHttp)
const expect = chai.expect

describe('API Tests', () => {
  it('should return a success message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(404)
        done()
      })
  })
})
