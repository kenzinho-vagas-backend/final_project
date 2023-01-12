import { Router } from 'express'
import { sessionController } from '../../controllers'
import { ensureEmailExistsMiddleware } from '../../middlewares'

const sessionRoutes = Router()

sessionRoutes.post('', ensureEmailExistsMiddleware, sessionController)

export default sessionRoutes