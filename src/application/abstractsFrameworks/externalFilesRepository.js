import ExternalFileServiceImpl from '../../frameworks/externalFileService/externalFileServiceImpl.js'

class ExternalFilesRepository {
  constructor (httpErrorManagerExternalFileService) {
    this.externalFileServiceImpl = new ExternalFileServiceImpl(httpErrorManagerExternalFileService)
  }

  async getFiles () {
    return await this.externalFileServiceImpl.getFiles()
  }

  async getFile (file) {
    return await this.externalFileServiceImpl.getFile(file)
  }
}

export default ExternalFilesRepository
