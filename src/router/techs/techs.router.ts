import { Router } from "express";
import { listAllCompaniesController } from "../../controllers/companies/companies.controllers";
import { createTechnologyController, deleteTechnolyController } from "../../controllers/techs/techs.controller";

const techsRouter = Router()

techsRouter.post('', createTechnologyController)
techsRouter.get('', listAllCompaniesController)
techsRouter.delete('', deleteTechnolyController)

export default techsRouter