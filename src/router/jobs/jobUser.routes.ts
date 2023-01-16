import { Router } from 'express'
import { createJobToUserController } from '../../controllers/jobToUser/jobToUser.controller'
import { listJobToUserController } from '../../controllers/jobToUser/jobToUser.controller'
import { deleteJobToUserController } from '../../controllers/jobToUser/jobToUser.controller'
import { ensureAuthMiddleware } from '../../middlewares/ensureAuth.middleware'
import { ensureJobExistsMiddleware } from '../../middlewares/ensureJobExists.middleware'

const jobUserRoutes = Router()

jobUserRoutes.post('', ensureAuthMiddleware,createJobToUserController)
jobUserRoutes.get('', ensureAuthMiddleware, listJobToUserController)
jobUserRoutes.delete('/:id', ensureAuthMiddleware,deleteJobToUserController)

export default jobUserRoutes
