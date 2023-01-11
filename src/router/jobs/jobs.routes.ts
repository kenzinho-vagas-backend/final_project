import { createJobSerializer } from '../../schemas/jobs/job.serializer'

import { updateJobController, getAllJobsController, deleteJobController, getCompanyJobsController, getTechnologiesJobsController, getCandidatesJobController, createJobController } from '../../controllers'

import { Router } from "express"
import { ensuranceIsOwnerCompany, ensuranceUserIsAdm, ensurePatchDataIsValidMiddleware } from '../../middlewares'
import {ensureAuthMiddleware} from '../../middlewares/ensureAuth.middleware'
import {ensureJobExistsMiddleware} from '../../middlewares/ensureJobExists.middleware'

const jobRoutes = Router()

jobRoutes.post('',ensureAuthMiddleware, ensuranceUserIsAdm, ensuranceIsOwnerCompany ,ensurePatchDataIsValidMiddleware(createJobSerializer), createJobController);
jobRoutes.get('', getAllJobsController)
jobRoutes.get('/:id', getCompanyJobsController)
jobRoutes.get('/technologies/:id',ensureAuthMiddleware ,getTechnologiesJobsController)
jobRoutes.get('/:id/user', ensureAuthMiddleware, ensuranceUserIsAdm, ensuranceIsOwnerCompany, ensureJobExistsMiddleware,getCandidatesJobController)
jobRoutes.patch('/:id', ensureAuthMiddleware, ensuranceUserIsAdm, ensuranceIsOwnerCompany, ensureJobExistsMiddleware ,updateJobController)
jobRoutes.delete('/:id', ensureAuthMiddleware, ensuranceUserIsAdm, ensuranceIsOwnerCompany, ensureJobExistsMiddleware,deleteJobController)

export default jobRoutes