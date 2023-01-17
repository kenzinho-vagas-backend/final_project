import { Router } from 'express'
import { createJobToUserController } from '../../controllers/jobToUser/jobToUser.controller'
import { listJobToUserController } from '../../controllers/jobToUser/jobToUser.controller'
import { deleteJobToUserController } from '../../controllers/jobToUser/jobToUser.controller'
import { ensuranceIsOwnerJobMiddleware } from '../../middlewares/ensuranceIsOwnerJob.middleware'
import { ensureAuthMiddleware } from '../../middlewares/ensureAuth.middleware'

const jobUserRoutes = Router()

jobUserRoutes.post('', ensureAuthMiddleware,createJobToUserController)
jobUserRoutes.get('', ensureAuthMiddleware,ensuranceIsOwnerJobMiddleware ,listJobToUserController)
jobUserRoutes.delete('/:id', ensureAuthMiddleware,deleteJobToUserController)

export default jobUserRoutes
