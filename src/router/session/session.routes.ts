import { Router } from 'express'
import { sessionController } from '../../controllers'
import { ensureUserExists } from '../../middlewares'

const sessionRoutes = Router()

sessionRoutes.post('', ensureUserExists, sessionController)

export default sessionRoutes