import { Router } from "express";
import { createTechnologyController, deleteTechnolyController, listTechnologiesController } from "../../controllers/techs/techs.controller";
import { ensuranceUserIsAdm, ensurePatchDataIsValidMiddleware } from "../../middlewares";
import { ensureAuthMiddleware } from "../../middlewares/ensureAuth.middleware";
import { techSerializer } from "../../schemas/techs/technology.schema";


const techsRoutes = Router()

techsRouter.post('', ensureAuthMiddleware, ensuranceUserIsAdm, ensurePatchDataIsValidMiddleware(techSerializer), createTechnologyController)
techsRouter.get('', listTechnologiesController)
techsRouter.delete('', ensureAuthMiddleware, ensuranceUserIsAdm, deleteTechnolyController)

export default techsRoutes