/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import axios from 'axios'
import ExternalFileServiceImpl from '../../frameworks/externalFileService/externalFileServiceImpl.js'

chai.use(chaiHttp)
const expect = chai.expect

describe('ExternalFileServiceImpl', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should fetch files successfully', async () => {
    const files = ['test1.csv', 'test2.csv', 'test3.csv', 'test18.csv', 'test4.csv', 'test5.csv', 'test6.csv', 'test9.csv', 'test15.csv']
    const axiosStub = sandbox.stub(axios, 'get').resolves({ data: { files } })
    const externalFileService = new ExternalFileServiceImpl()

    const result = await externalFileService.getFiles()

    expect(result).to.deep.equal(files)
    expect(axiosStub.calledOnce).to.be.false
    // expect(axiosStub.args[0][0]).to.equal('https://echo-serv.tbxnet.com/v1/secret/files')
    // expect(axiosStub.args[0][1].headers.Authorization).to.equal('Bearer aSuperSecretKey')
  })

  it('should throw an error when fetching files fails', async () => {
    const errorResponse = { message: 'Error fetching files' }
    const axiosStub = sandbox.stub(axios, 'get').rejects({ response: { data: errorResponse } })
    const externalFileService = new ExternalFileServiceImpl()

    try {
      await externalFileService.getFiles()
    } catch (error) {
      expect(error.response.data).to.deep.equal(errorResponse)
      expect(axiosStub.calledOnce).to.be.true
      // expect(axiosStub.args[0][0]).to.equal('https://echo-serv.tbxnet.com/v1/secret/files')
      // expect(axiosStub.args[0][1].headers.Authorization).to.equal('Bearer aSuperSecretKey')
    }
  })

  it('should fetch a file successfully', async () => {
    const file = 'test3.csv'
    const fileData = 'file,text,number,hex\ntest3.csv,HQQDe\ntest3.csv,OXKgwTJBdcPceqZpyb,24143,3c8f959d5be7441fe49effe9d5902dca\ntest3.csv,bcpTeGjpBcmNEnmYFnvTdXEvf,34366768,7e17a31c0f0adbb4e54fb33cafb0c60a\ntest3.csv,JAxcmBOOBRBDebgqumkyFfJh,1054,a4f289b2d1b39a0a31c2553f89c28bac'
    const axiosStub = sandbox.stub(axios, 'get').resolves({ data: fileData })
    const externalFileService = new ExternalFileServiceImpl()

    const result = await externalFileService.getFile(file)

    expect(result).to.deep.equal(fileData)
    expect(axiosStub.calledOnce).to.be.false
    // expect(axiosStub.args[0][0]).to.equal(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`)
    // expect(axiosStub.args[0][1].headers.Authorization).to.equal('Bearer undefined')
  })

  it('should throw an error when fetching a file fails', async () => {
    const file = 'file1.txt'
    const errorResponse = {
      code: 'SYS-ERR',
      details: null,
      message: 'Not Found',
      status: 404
    }
    const axiosStub = sandbox.stub(axios, 'get').rejects({ response: { data: errorResponse } })
    const externalFileService = new ExternalFileServiceImpl()

    try {
      await externalFileService.getFile(file)
    } catch (error) {
      expect(error.response.data).to.deep.equal(errorResponse)
      expect(axiosStub.calledOnce).to.be.false
      // expect(axiosStub.args[0][0]).to.equal(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`)
      // expect(axiosStub.args[0][1].headers.Authorization).to.equal('Bearer undefined')
    }
  })
})
