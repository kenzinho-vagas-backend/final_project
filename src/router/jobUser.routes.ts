import { Router } from "express";
import { createJobToUserController } from "../controllers";

const jobUserRoutes = Router()

jobUserRoutes.post('', createJobToUserController)

export default jobUserRoutes
