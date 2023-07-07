class FileController {
  constructor (fileService) {
    this.fileService = fileService
  }

  async getFilesData (req, res) {
    const { fileName } = req.query
    if (!fileName || fileName.trim() === '') {
      const files = await this.fileService.getFilesData()
      res.json(files)
    } else {
      const files = await this.fileService.getFileData(fileName)
      res.json(files)
    }
  }

  async getFilesList (req, res) {
    const files = await this.fileService.getFilesList()
    res.json(files)
  }
}

export default FileController
