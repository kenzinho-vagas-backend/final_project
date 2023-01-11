import { Router } from 'express'
import { sessionController } from '../../controllers/sessionController.controllers'
import ensureUserExists from '../../middlewares/ensureUserExists.middleware'

const sessionRoutes = Router()

sessionRoutes.post('', ensureUserExists, sessionController)

export default sessionRoutes