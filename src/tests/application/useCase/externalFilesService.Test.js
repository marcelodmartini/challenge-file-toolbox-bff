/* eslint-disable no-undef */
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import ExternalFilesService from '../../../application/useCase/externalFilesService.js'

chai.use(chaiAsPromised)
chai.should()

describe('ExternalFilesService', () => {
  const externalFilesRepository = {
    getFiles: async () => ['file1.csv', 'file2.csv'],
    getFile: async (file) => {
      if (file === 'file1.csv') {
        return 'file,text,number,hex\n' +
          'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765\n' +
          'file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5\n' +
          'file1.csv,PNzRfORtKtEDOzmIVrQuSh,74088708,3\n' +
          'e29651a63a5202a5661e05a060401fb\n' +
          'file1.csv,d,6173,f9e1bcdb9e3784acc448af34f4727252\n'
      } else {
        return 'file,text,number,hex\n' +
          'file2.csv,ABC,123,abcdef\n' +
          'file2.csv,XYZ,456,7890abcd\n'
      }
    }
  }

  const externalFilesService = new ExternalFilesService(externalFilesRepository)

  describe('processFiles', () => {
    it('should return processed files', async () => {
      const processedFiles = await externalFilesService.processFiles()

      processedFiles.should.be.an('array')
      processedFiles.should.have.lengthOf(2)

      const file1 = processedFiles[0]
      const file2 = processedFiles[1]

      file1.should.have.property('file').equal('file1.csv')
      file1.should.have.property('lines').that.is.an('array').with.lengthOf(4)

      file2.should.have.property('file').equal('file2.csv')
      file2.should.have.property('lines').that.is.an('array').with.lengthOf(2)
    })

    it('should handle empty files', async () => {
      const emptyFilesRepository = {
        getFiles: async () => [],
        getFile: async () => {
          throw new Error('Should not be called')
        }
      }

      const emptyFilesService = new ExternalFilesService(emptyFilesRepository)
      const processedFiles = await emptyFilesService.processFiles()

      processedFiles.should.be.an('array')
      processedFiles.should.have.lengthOf(0)
    })

    it('should handle files with errors', async () => {
      const errorFilesRepository = {
        getFiles: async () => ['file1.csv'],
        getFile: async () => {
          return 'file,text,number,hex\n' +
            'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765\n' +
            'file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5\n' +
            'file1.csv,PNzRfORtKtEDOzmIVrQuSh,74088708,3\n' +
            'Invalid Line\n' +
            'file1.csv,d,6173,f9e1bcdb9e3784acc448af34f4727252\n'
        }
      }

      const errorFilesService = new ExternalFilesService(errorFilesRepository)
      const processedFiles = await errorFilesService.processFiles()

      processedFiles.should.be.an('array')
      processedFiles.should.have.lengthOf(1)

      const file1 = processedFiles[0]
      file1.should.have.property('file').equal('file1.csv')
      file1.should.have.property('lines').that.is.an('array').with.lengthOf(4)
    })
  })

  describe('processFileData', () => {
    it('should process file data', () => {
      const fileData = 'file,text,number,hex\n' +
        'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765\n' +
        'file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5\n' +
        'file1.csv,PNzRfORtKtEDOzmIVrQuSh,74088708,3\n' +
        'e29651a63a5202a5661e05a060401fb\n' +
        'file1.csv,d,6173,f9e1bcdb9e3784acc448af34f4727252\n'

      const processedLines = externalFilesService.processFileData(fileData)

      processedLines.should.be.an('array')
      processedLines.should.have.lengthOf(3)

      const line1 = processedLines[0]
      const line2 = processedLines[1]
      const line3 = processedLines[2]

      line1.should.deep.equal({ text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' })
      line2.should.deep.equal({ text: 'AtjW', number: 6, hex: 'd33a8ca5d36d3106219f66f939774cf5' })
      line3.should.deep.equal({ text: 'PNzRfORtKtEDOzmIVrQuSh', number: 74088708, hex: '3' })
    })

    it('should ignore lines with errors', () => {
      const fileData = 'file,text,number,hex\n' +
        'file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765\n' +
        'file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5\n' +
        'Invalid Line\n' +
        'file1.csv,d,6173,f9e1bcdb9e3784acc448af34f4727252\n'

      const processedLines = externalFilesService.processFileData(fileData)

      processedLines.should.be.an('array')
      processedLines.should.have.lengthOf(3)

      const line1 = processedLines[0]
      const line2 = processedLines[1]

      line1.should.deep.equal({ text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' })
      line2.should.deep.equal({ text: 'AtjW', number: 6, hex: 'd33a8ca5d36d3106219f66f939774cf5' })
    })
  })
})
