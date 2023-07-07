/* eslint-disable n/handle-callback-err */
/* eslint-disable no-undef */
import chai from 'chai'
import chaiHttp from 'chai-http'
import express from 'express'
import FileController from '../../controllers/fileController.js'

chai.use(chaiHttp)
const expect = chai.expect

describe('FileController', () => {
  let app
  let fileController

  beforeEach(() => {
    app = express()
    fileController = new FileController({
      getFilesData: () => ['file1.txt', 'file2.txt', 'file3.txt']
    })

    app.get('/files', fileController.getFilesData.bind(fileController))
  })

  it('should return all files', (done) => {
    chai
      .request(app)
      .get('/files')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.deep.equal(['file1.txt', 'file2.txt', 'file3.txt'])
        done()
      })
  })
})
