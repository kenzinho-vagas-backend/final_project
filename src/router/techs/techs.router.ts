import { Router } from 'express'
import { listTechnologiesController } from '../../controllers/techs/techs.controller'

const techsRoutes = Router()

techsRoutes.get('', listTechnologiesController)

export default techsRoutes