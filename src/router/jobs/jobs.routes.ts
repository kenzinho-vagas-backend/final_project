import { createJobSerializer } from '../../schemas/jobs/job.serializer'

import { updateJobController, getAllJobsController, deleteJobController, getCompanyJobsController, getTechnologiesJobsController, getCandidatesJobController, createJobController } from '../../controllers'

import { Router } from 'express'
import { ensuranceUserIsAdmMiddleware, ensurePatchDataIsValidMiddleware } from '../../middlewares'
import { ensureAuthMiddleware } from '../../middlewares/ensureAuth.middleware'
import { ensureJobExistsMiddleware } from '../../middlewares/ensureJobExists.middleware'
import {ensuranceIsOwnerJobMiddleware} from '../../middlewares/ensuranceIsOwnerJob.middleware'

const jobRoutes = Router()

jobRoutes.post('',ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensurePatchDataIsValidMiddleware(createJobSerializer), createJobController)
jobRoutes.get('', getAllJobsController)
jobRoutes.get('/companies/:id', getCompanyJobsController)
jobRoutes.get('/technologies/:id',ensureAuthMiddleware ,getTechnologiesJobsController)
jobRoutes.get('/:id/user',ensureAuthMiddleware, getCandidatesJobController)
jobRoutes.patch('/:id', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensureJobExistsMiddleware ,ensuranceIsOwnerJobMiddleware, updateJobController)
jobRoutes.delete('/:id', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensureJobExistsMiddleware, ensuranceIsOwnerJobMiddleware, deleteJobController)

export default jobRoutes