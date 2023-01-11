import { Router } from "express";
// import { createJobToUserController } from "../controllers";
import { createJobToUserController } from "../controllers/jobToUser/jobToUser.controller";
import { listJobToUserController } from "../controllers/jobToUser/jobToUser.controller";
import { deleteJobToUserController } from "../controllers/jobToUser/jobToUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const jobUserRoutes = Router()

jobUserRoutes.post('', createJobToUserController)
jobUserRoutes.get('', ensureAuthMiddleware, listJobToUserController)
jobUserRoutes.get('/:id', ensureAuthMiddleware, deleteJobToUserController)

export default jobUserRoutes
