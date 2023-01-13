import { Router } from 'express'
import { createTechnologyController, deleteTechnolyController, listTechnologiesController } from '../../controllers/techs/techs.controller'
import { ensuranceUserIsAdmMiddleware, ensurePatchDataIsValidMiddleware } from '../../middlewares'
import { ensureAuthMiddleware } from '../../middlewares/ensureAuth.middleware'
import { techSerializer } from '../../schemas/techs/technology.schema'


const techsRoutes = Router()

techsRoutes.post('', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensurePatchDataIsValidMiddleware(techSerializer), createTechnologyController)
techsRoutes.get('', listTechnologiesController)
techsRoutes.delete('/:id', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, deleteTechnolyController)

export default techsRoutes