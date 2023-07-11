/* eslint-disable no-undef */
import { expect } from 'chai'
import FileService from '../../../application/useCase/fileService.js'
import File from '../../../entities/File.js'

describe('FileService', () => {
  describe('getFileData', () => {
    it('should return an array of File objects', async () => {
      const externalFilesServiceMock = {
        processFile: async (fileName) => {
          // Mock implementation for externalFilesService.processFile
          // Simulating the returned filesData from external service
          return [
            {
              fileName: 'file1.txt',
              lines: [
                { text: 'text3', number: 11111111, hex: 'b2e758639dfceb655e3cf25f48fc996e' },
                { text: 'text4', number: 33333333, hex: 'b2e758639dfceb655e3cf25f48fc996e' }
              ]
            },
            {
              fileName: 'file2.txt',
              lines: [
                { text: 'text3', number: 11111111, hex: 'b2e758639dfceb655e3cf25f48fc996e' },
                { text: 'text4', number: 33333333, hex: 'b2e758639dfceb655e3cf25f48fc996e' }
              ]
            }
          ]
        }
      }

      const fileService = new FileService(externalFilesServiceMock)
      const result = await fileService.getFileData('file1.txt')

      expect(result).to.be.an('array')
      expect(result[0]).to.be.an.instanceOf(File)
      expect(result[0].file).to.equal('file1.txt')
    })
  })

  describe('getFilesData', () => {
    it('should return an array of File objects', async () => {
      const externalFilesServiceMock = {
        processFiles: async () => {
          // Mock implementation for externalFilesService.processFiles
          // Simulating the returned filesData from external service
          return [
            {
              file: 'file1.txt',
              lines: [
                { text: 'text3', number: 11111111, hex: 'b2e758639dfceb655e3cf25f48fc996e' },
                { text: 'text4', number: 33333333, hex: 'b2e758639dfceb655e3cf25f48fc996e' }
              ]
            },
            {
              file: 'file2.txt',
              lines: [
                { text: 'text3', number: 11111111, hex: 'b2e758639dfceb655e3cf25f48fc996e' },
                { text: 'text4', number: 33333333, hex: 'b2e758639dfceb655e3cf25f48fc996e' }
              ]
            }
          ]
        }
      }

      const fileService = new FileService(externalFilesServiceMock)
      const result = await fileService.getFilesData()

      expect(result).to.be.an('array')
      expect(result[0]).to.be.an.instanceOf(File)
      expect(result[0].file).to.equal('file1.txt')
      expect(result[1]).to.be.an.instanceOf(File)
      expect(result[1].file).to.equal('file2.txt')
    })
  })

  describe('getFilesList', () => {
    it('should return an array of file names', async () => {
      const externalFilesServiceMock = {
        getFilesList: async () => {
          // Mock implementation for externalFilesService.getFilesList
          // Simulating the returned files list from external service
          return ['file1.txt', 'file2.txt']
        }
      }

      const fileService = new FileService(externalFilesServiceMock)
      const result = await fileService.getFilesList()

      expect(result).to.be.an('array')
      expect(result[0]).to.equal('file1.txt')
      expect(result[1]).to.equal('file2.txt')
    })
  })
})
