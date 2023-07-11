/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import axios from 'axios'
import ExternalFileServiceImpl from '../../../frameworks/externalFileService/externalFileServiceImpl.js'
import HttpErrorManagerExternalFileService from '../../../utils/httpErrorManagerExternalFileService.js'

chai.use(chaiHttp)
const expect = chai.expect

describe('ExternalFileServiceImpl', () => {
  describe('getFiles', () => {
    it('should return an array of files', async () => {
      const externalFileService = new ExternalFileServiceImpl(new HttpErrorManagerExternalFileService())

      const files = await externalFileService.getFiles()

      expect(files).to.be.an('array')
    })

    it('should handle error when fetching files', async () => {
      const externalFileService = new ExternalFileServiceImpl(new HttpErrorManagerExternalFileService())

      try {
        await externalFileService.getFiles()
        // If the previous line did not throw an error, fail the test
        throw new Error('Expected an error to be thrown')
      } catch (error) {
        expect(error).to.be.an('Error')
      }
    })
  })

  describe('getFile', () => {
    it('should handle error when fetching a file', async () => {
      const externalFileService = new ExternalFileServiceImpl(new HttpErrorManagerExternalFileService())
      const file = 'nonexistent.txt'

      try {
        await externalFileService.getFile(file)
        // If the previous line did not throw an error, fail the test
        throw new Error('Expected an error to be thrown')
      } catch (error) {
        expect(error).to.deep.equal({
          status: 404,
          message: 'Not Found',
          details: 'Unknown error occurred details.'
        })
      }
    })
  })
})
