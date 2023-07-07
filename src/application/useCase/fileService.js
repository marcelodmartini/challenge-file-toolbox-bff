import File from '../../entities/File.js'

class FileService {
  constructor (externalFilesService) {
    this.externalFilesService = externalFilesService
  }

  async getFileData (fileName) {
    const filesData = await this.externalFilesService.processFile(fileName)

    const file = filesData.map(fileData => {
      const { fileName, lines } = fileData
      return new File(fileName, lines)
    })

    return file
  }

  async getFilesData () {
    const filesData = await this.externalFilesService.processFiles()

    const files = filesData.map(fileData => {
      const { file, lines } = fileData
      return new File(file, lines)
    })

    return files
  }

  async getFilesList () {
    const files = await this.externalFilesService.getFilesList()
    return files
  }
}

export default FileService
