import { createJobSerializer } from './../schemas/job.serializer';
import { updateJobController, getAllJobsController, deleteJobController, getCompanyJobsController, getTechnologiesJobsController, getCandidatesJobController, createJobController } from './../controllers/';
import { Router } from "express";
import { ensurePatchDataIsValidMiddleware } from '../middlewares/';

const jobRoutes = Router();

jobRoutes.post('', /*colocar middleware apenas admin*/ensurePatchDataIsValidMiddleware(createJobSerializer), createJobController);
jobRoutes.get('', getAllJobsController)
jobRoutes.get('/:id', getCompanyJobsController)
jobRoutes.get('/technologies/:id', getTechnologiesJobsController)
jobRoutes.get('/:id/user', getCandidatesJobController)
jobRoutes.patch('/:id', /*colocar middleware apenas admin*/ updateJobController)
jobRoutes.delete('/:id', deleteJobController)

export default jobRoutes;
