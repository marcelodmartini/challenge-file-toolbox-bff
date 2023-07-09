import get from 'axios'

class ExternalFileServiceImpl {
  constructor (httpErrorManagerExternalFileService) {
    this.baseUrl = 'https://echo-serv.tbxnet.com'
    this.apiKey = 'Bearer aSuperSecretKey'
    this.headers = {
      Authorization: this.apiKey,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    }
    this.httpErrorManagerExternalFileService = httpErrorManagerExternalFileService
  }

  async getFiles () {
    try {
      const response = await get(`${this.baseUrl}/v1/secret/files`, {
        headers: this.headers
      })
      return response.data.files
    } catch (error) {
      const errorExternalFileService = this.httpErrorManagerExternalFileService.createHttpError(error)
      console.error('Error fetching files:', errorExternalFileService)
      throw errorExternalFileService
    }
  }

  async getFile (file) {
    try {
      const response = await get(`${this.baseUrl}/v1/secret/file/${file}`, {
        headers: this.headers
      })
      return response.data
    } catch (error) {
      const errorExternalFileService = this.httpErrorManagerExternalFileService.createHttpError(error)
      console.error(`Error fetching file ${file}:`, errorExternalFileService)
      throw errorExternalFileService
    }
  }
}

export default ExternalFileServiceImpl
