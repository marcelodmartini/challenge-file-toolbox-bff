import express from 'express'
import FileController from '../../controllers/fileController.js'
import FileService from '../../application/useCase/fileService.js'
import ExternalFilesService from '../../application/useCase/externalFilesService.js'
import ExternalFilesRepository from '../../application/abstractsFrameworks/externalFilesRepository.js'

const router = express.Router()
const externalFilesRepository = new ExternalFilesRepository()
const externalFilesService = new ExternalFilesService(externalFilesRepository)
const fileService = new FileService(externalFilesService)
const fileController = new FileController(fileService)

router.get('/files/data', fileController.getFilesData.bind(fileController))
router.get('/files/list', fileController.getFilesList.bind(fileController))

export default router
