/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai'
import ExternalFilesService from '../../../application/useCase/externalFilesService.js'
import chaiAsPromised from 'chai-as-promised'

const { expect } = chai
chai.use(chaiAsPromised)

describe('ExternalFilesService', () => {
  describe('getFilesList', () => {
    it('should return a list of files', async () => {
      const externalFilesRepository = {
        getFiles: () => Promise.resolve(['file1', 'file2', 'file3'])
      }
      const service = new ExternalFilesService(externalFilesRepository)

      const result = await service.getFilesList()

      expect(result).to.deep.equal(['file1', 'file2', 'file3'])
    })

    it('should throw an error if repository returns an error', async () => {
      const externalFilesRepository = {
        getFiles: () => Promise.reject(new Error('Repository error'))
      }
      const service = new ExternalFilesService(externalFilesRepository)

      await expect(service.getFilesList()).to.be.rejectedWith('Repository error')
    })
  })

  describe('processFile', () => {
    it('should process a file and return the processed data', async () => {
      const fileData = 'file,text,number,hex\nfile1,text1,12345678,ddf63716b65730b5c9b87c73b8399acb\nfile1,text2,98765432,ddf63716b65730b5c9b87c73b8399acb'

      const externalFilesRepository = {
        getFile: () => Promise.resolve(fileData)
      }
      const service = new ExternalFilesService(externalFilesRepository)

      const result = await service.processFile('file1')
      expect(result).to.deep.equal([{
        fileName: 'file1',
        lines: [
          { text: 'text1', number: 12345678, hex: 'ddf63716b65730b5c9b87c73b8399acb' },
          { text: 'text2', number: 98765432, hex: 'ddf63716b65730b5c9b87c73b8399acb' }
        ]
      }])
    })

    it('should return an empty array if no lines pass validation', async () => {
      const fileData = 'file,text,number,hex\nfile1,text1,12345678,invalid_hex\nfile1,text2,non_number,abcdef'
      const externalFilesRepository = {
        getFile: () => Promise.resolve(fileData)
      }
      const service = new ExternalFilesService(externalFilesRepository)

      const result = await service.processFile('file1')

      expect(result).to.deep.equal([])
    })

    it('should throw an error if repository returns an error', async () => {
      const externalFilesRepository = {
        getFile: () => Promise.reject(new Error('Repository error'))
      }
      const service = new ExternalFilesService(externalFilesRepository)

      await expect(service.processFile('file1')).to.be.rejectedWith('Repository error')
    })
  })

  describe('processFiles', () => {
    it('should process multiple files and return the processed data', async () => {
      const files = ['file1', 'file2', 'file3']
      const fileData = {
        file1: 'file,text,number,hex\nfile1,text1,12345678,ddf63716b65730b5c9b87c73b8399acb\nfile1,text2,98765432,ddf63716b65730b5c9b87c73b8399acb',
        file2: 'file,text,number,hex\nfile2,text3,11111111,ddf63716b65730b5c9b87c73b8399acb\nfile2,text4,33333333,ddf63716b65730b5c9b87c73b8399acb',
        file3: 'file,text,number,hex\nfile3,text5,55555555,ddf63716b65730b5c9b87c73b8399acb\nfile3,text6,77777777,ddf63716b65730b5c9b87c73b8399acb'
      }
      const externalFilesRepository = {
        getFiles: () => Promise.resolve(files),
        getFile: (fileName) => Promise.resolve(fileData[fileName])
      }
      const service = new ExternalFilesService(externalFilesRepository)

      const result = await service.processFiles()
      expect(result).to.deep.equal([
        {
          file: 'file1',
          lines: [
            { text: 'text1', number: 12345678, hex: 'ddf63716b65730b5c9b87c73b8399acb' },
            { text: 'text2', number: 98765432, hex: 'ddf63716b65730b5c9b87c73b8399acb' }
          ]
        },
        {
          file: 'file2',
          lines: [
            { text: 'text3', number: 11111111, hex: 'ddf63716b65730b5c9b87c73b8399acb' },
            { text: 'text4', number: 33333333, hex: 'ddf63716b65730b5c9b87c73b8399acb' }
          ]
        },
        {
          file: 'file3',
          lines: [
            { text: 'text5', number: 55555555, hex: 'ddf63716b65730b5c9b87c73b8399acb' },
            { text: 'text6', number: 77777777, hex: 'ddf63716b65730b5c9b87c73b8399acb' }
          ]
        }
      ])
    })

    it('should skip files with no valid lines', async () => {
      const files = ['file1', 'file2', 'file3']
      const fileData = {
        file1: 'file,text,number,hex\nfile1,text1,12345678,invalid_hex\nfile1,text2,non_number,abcdef',
        file2: 'file,text,number,hex\nfile2,text3,11111111,b2e758639dfceb655e3cf25f48fc996e\nfile2,text4,33333333,b2e758639dfceb655e3cf25f48fc996e',
        file3: 'file,text,number,hex\nfile3,text5,55555555,invalid_hex\nfile3,text6,non_number,66666666'
      }
      const externalFilesRepository = {
        getFiles: () => Promise.resolve(files),
        getFile: (fileName) => Promise.resolve(fileData[fileName])
      }
      const service = new ExternalFilesService(externalFilesRepository)

      const result = await service.processFiles()

      expect(result).to.deep.equal([
        {
          file: 'file2',
          lines: [
            { text: 'text3', number: 11111111, hex: 'b2e758639dfceb655e3cf25f48fc996e' },
            { text: 'text4', number: 33333333, hex: 'b2e758639dfceb655e3cf25f48fc996e' }
          ]
        }
      ])
    })

    it('should throw an error if repository returns an error', async () => {
      const externalFilesRepository = {
        getFiles: () => Promise.reject(new Error('Repository error')),
        getFile: () => Promise.reject(new Error('Repository error'))
      }
      const service = new ExternalFilesService(externalFilesRepository)

      await expect(service.processFiles()).to.be.rejectedWith('Repository error')
    })
  })
})
