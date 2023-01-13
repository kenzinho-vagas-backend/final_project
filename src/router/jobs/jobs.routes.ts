import { createJobSerializer } from '../../schemas/jobs/job.serializer'

import { updateJobController, getAllJobsController, deleteJobController, getCompanyJobsController, getTechnologiesJobsController, getCandidatesJobController, createJobController } from '../../controllers'

import { Router } from 'express'
import { ensuranceIsOwnerCompanyMiddleware, ensuranceUserIsAdmMiddleware, ensurePatchDataIsValidMiddleware } from '../../middlewares'
import { ensureAuthMiddleware } from '../../middlewares/ensureAuth.middleware'
import { ensureJobExistsMiddleware } from '../../middlewares/ensureJobExists.middleware'

const jobRoutes = Router()

jobRoutes.post('',ensureAuthMiddleware, ensuranceUserIsAdmMiddleware,ensurePatchDataIsValidMiddleware(createJobSerializer), createJobController)
jobRoutes.get('', getAllJobsController)
jobRoutes.get('/:id', getCompanyJobsController)
jobRoutes.get('/technologies/:id',ensureAuthMiddleware ,getTechnologiesJobsController)
jobRoutes.get('/:id/user', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensureJobExistsMiddleware,getCandidatesJobController)
jobRoutes.patch('/:id', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensureJobExistsMiddleware ,updateJobController)
jobRoutes.delete('/:id', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensureJobExistsMiddleware,deleteJobController)

export default jobRoutes