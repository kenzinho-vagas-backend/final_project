import { Router } from 'express'
import { sessionController } from '../../controllers'
import { ensuranceIsUserExists } from '../../middlewares'

const sessionRoutes = Router()

sessionRoutes.post('', ensuranceIsUserExists, sessionController)

export default sessionRoutes