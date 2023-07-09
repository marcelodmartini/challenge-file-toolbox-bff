class FileController {
  constructor (fileService) {
    this.fileService = fileService
  }

  async getFilesData (req, res) {
    try {
      const { fileName } = req.query
      if (!fileName || fileName.trim() === '') {
        const files = await this.fileService.getFilesData()
        res.json(files)
      } else {
        const files = await this.fileService.getFileData(fileName)
        res.json(files)
      }
    } catch (errorFilesList) {
      res.status(errorFilesList.status)
        .json({ message: errorFilesList.message + ' - ' + errorFilesList.details })
    }
  }

  async getFilesList (req, res) {
    try {
      const files = await this.fileService.getFilesList()
      res.json(files)
    } catch (errorFilesList) {
      res.status(errorFilesList.status)
        .json({ message: errorFilesList.message + ' - ' + errorFilesList.details })
    }
  }
}

export default FileController
