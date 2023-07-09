const { expect } = require('chai')
const httpErrorManagerExternalFileService = require('../src/httpErrorManagerExternalFileService')

describe('httpErrorManagerExternalFileService', () => {
  it('should handle successful requests', async () => {
    const httpErrorManagerExternalFileService = new httpErrorManagerExternalFileService()
    const baseUrl = 'https://jsonplaceholder.typicode.com'
    httpErrorManagerExternalFileService.setBaseUrl(baseUrl)

    const result = await httpErrorManagerExternalFileService.makeRequest('/posts/1')
    expect(result.id).to.equal(1)
  })

  it('should handle 404 not found', async () => {
    const httpErrorManagerExternalFileService = new httpErrorManagerExternalFileService()
    const baseUrl = 'https://jsonplaceholder.typicode.com'
    httpErrorManagerExternalFileService.setBaseUrl(baseUrl)

    try {
      await httpErrorManagerExternalFileService.makeRequest('/nonexistent')
    } catch (error) {
      expect(error.status).to.equal(404)
      expect(error.message).to.equal('Not found')
    }
  })

  it('should handle network errors', async () => {
    const httpErrorManagerExternalFileService = new httpErrorManagerExternalFileService()
    const baseUrl = 'https://nonexistent-api.example.com'
    httpErrorManagerExternalFileService.setBaseUrl(baseUrl)

    try {
      await httpErrorManagerExternalFileService.makeRequest('/posts/1')
    } catch (error) {
      expect(error.status).to.equal(503)
      expect(error.message).to.equal('Service unavailable.')
    }
  })
})
