import { Router } from "express";
// import { createJobToUserController } from "../controllers";
import { createJobToUserController } from "../controllers/jobToUser/jobToUser.controller";
import { listJobToUserController } from "../controllers/jobToUser/jobToUser.controller";

const jobUserRoutes = Router()

jobUserRoutes.post('', createJobToUserController)
jobUserRoutes.get('', listJobToUserController)

export default jobUserRoutes
