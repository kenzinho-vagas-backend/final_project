import { Router } from 'express'
import { listAllCompaniesController } from '../../controllers/companies/companies.controllers'
import { createTechnologyController, deleteTechnolyController } from '../../controllers/techs/techs.controller'

const techsRoutes = Router()

techsRoutes.post('', createTechnologyController)
techsRoutes.get('', listAllCompaniesController)
techsRoutes.delete('', deleteTechnolyController)

export default techsRoutes