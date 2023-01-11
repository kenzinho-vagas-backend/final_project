import { Router } from "express";
// import { createJobToUserController } from "../controllers";
import { createJobToUserController } from "../controllers/jobToUser/jobToUser.controller";
import { listJobToUserController } from "../controllers/jobToUser/jobToUser.controller";
import { deleteJobToUserController } from "../controllers/jobToUser/jobToUser.controller";

const jobUserRoutes = Router()

jobUserRoutes.post('', createJobToUserController)
jobUserRoutes.get('', /*colocar middleware de verificação de token*/ listJobToUserController)
jobUserRoutes.get('/:id',/*colocar middleware de verificação de token*/ deleteJobToUserController)

export default jobUserRoutes
