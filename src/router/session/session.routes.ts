import { Router } from 'express'
import { sessionController } from '../../controllers'
import { ensureEmailExists } from '../../middlewares'

const sessionRoutes = Router()

sessionRoutes.post('', ensureEmailExists, sessionController)

export default sessionRoutes