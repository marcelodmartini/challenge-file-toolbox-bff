import get from 'axios'

class ExternalFileServiceImpl {
  constructor () {
    this.baseUrl = 'https://echo-serv.tbxnet.com'
    this.apiKey = 'Bearer aSuperSecretKey'
  }

  async getFiles () {
    try {
      const response = await get(`${this.baseUrl}/v1/secret/files`, {
        headers: {
          Authorization: this.apiKey,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
        }
      })
      return response.data.files
    } catch (error) {
      console.error('Error fetching files:', error.response.data)
      throw error
    }
  }

  async getFile (file) {
    try {
      const response = await get(`${this.baseUrl}/v1/secret/file/${file}`, {
        headers: {
          Authorization: this.apiKey,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
        }
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching file ${file}:`, error.response.data)
      throw error
    }
  }
}

export default ExternalFileServiceImpl
