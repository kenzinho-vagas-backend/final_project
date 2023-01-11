import { Router } from "express";
// import { createJobToUserController } from "../controllers";
import { createJobToUserController } from "../controllers/jobToUser/jobToUser.controller";
import { listJobToUserController } from "../controllers/jobToUser/jobToUser.controller";
import { deleteJobToUserController } from "../controllers/jobToUser/jobToUser.controller";

const jobUserRoutes = Router()

jobUserRoutes.post('', createJobToUserController)
jobUserRoutes.get('', listJobToUserController)
jobUserRoutes.get('/:id', deleteJobToUserController)

export default jobUserRoutes
