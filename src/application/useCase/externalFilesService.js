class ExternalFilesService {
  constructor (externalFilesRepository) {
    this.externalFilesRepository = externalFilesRepository
  }

  async getFilesList () {
    const files = await this.externalFilesRepository.getFiles()
    return files
  }

  async processFile (fileName) {
    const processedFile = []
    const fileData = await this.externalFilesRepository.getFile(fileName)
    const processedLines = this.processFileData(fileData)
    if (processedLines.length > 0) {
      processedFile.push({
        fileName,
        lines: processedLines
      })
    }
    return processedFile
  }

  async processFiles () {
    const files = await this.externalFilesRepository.getFiles()

    const promises = files.map(async (file) => {
      try {
        const fileData = await this.externalFilesRepository.getFile(file)
        const processedLines = this.processFileData(fileData)

        if (processedLines.length > 0) {
          return {
            file,
            lines: processedLines
          }
        }
      } catch (error) {
        console.error(`Error fetching data file ${file}:`, error)
      }

      return null
    })

    const results = await Promise.all(promises)
    return results.filter(result => result !== null)
  }

  processFileData (fileData) {
    const lines = fileData.split('\n')
    const processedLines = []
    lines.shift()
    for (const line of lines) {
      const data = line.split(',')
      //
      if (data.length === 4) {
        // eslint-disable-next-line no-unused-vars
        const [file, text, number, hex] = data
        // eslint-disable-next-line no-undef
        if (this.rulesValidation([file, text, number, hex])) {
          processedLines.push({ text, number: parseInt(number), hex })
        }
      }
    }

    return processedLines
  }

  /* Take into account that there may be empty files and lines with errors (that do not have the necessary amount of data).
    If a line has an error, it must be discarded.
    There may also be errors when downloading a file
    The Text field cannot be empty or null.
    The hex field must have exactly 32 digits
    The number field must be a number and not a text
  */
  rulesValidation ([file, text, number, hex]) {
    if (!text || text.trim() === '') { return false }
    if (hex.length !== 32) { return false }
    if (isNaN(number)) { return false }
    return true
  }
}

export default ExternalFilesService
