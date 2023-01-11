import { Router } from 'express';
import { createCompanyController, listAllCompaniesController } from '../controllers/companies/companies.controllers';

const companiesRoutes = Router()

companiesRoutes.post('',/* Colocar middleware de admin*/ createCompanyController)
companiesRoutes.get('', listAllCompaniesController)
companiesRoutes.patch('')
companiesRoutes.delete('')

export default companiesRoutes