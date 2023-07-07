import ExternalFileServiceImpl from '../../frameworks/externalFileService/externalFileServiceImpl.js'

class ExternalFilesRepository {
  constructor () {
    this.externalFileServiceImpl = new ExternalFileServiceImpl()
  }

  async getFiles () {
    return await this.externalFileServiceImpl.getFiles()
  }

  async getFile (file) {
    return await this.externalFileServiceImpl.getFile(file)
  }
}

export default ExternalFilesRepository
