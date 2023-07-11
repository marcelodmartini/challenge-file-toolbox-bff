/* eslint-disable no-undef */
import { expect } from 'chai'
import HttpErrorManagerExternalFileService from '../../utils/httpErrorManagerExternalFileService.js'

describe('httpErrorManagerExternalFileService', () => {
  describe('createHttpError', () => {
    it('should return the correct error object when response exists', () => {
      const error = {
        response: {
          status: 404,
          data: {
            message: 'Not found.',
            details: 'Resource not found.'
          }
        }
      }

      const service = new HttpErrorManagerExternalFileService()
      const result = service.createHttpError(error)

      expect(result).to.deep.equal({
        status: 404,
        message: 'Not found.',
        details: 'Resource not found.'
      })
    })

    it('should return the correct error object when response does not exist', () => {
      const error = {
        request: {}
      }

      const service = new HttpErrorManagerExternalFileService()
      const result = service.createHttpError(error)

      expect(result).to.deep.equal({
        status: 503,
        message: 'Service unavailable.',
        details: 'Service unavailable.'
      })
    })

    it('should return the correct error object when neither response nor request exist', () => {
      const error = {}

      const service = new HttpErrorManagerExternalFileService()
      const result = service.createHttpError(error)

      expect(result).to.deep.equal({
        status: 500,
        message: 'Internal server error.',
        details: 'Internal server error.'
      })
    })
  })
})
