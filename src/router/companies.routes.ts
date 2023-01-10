import { Router } from 'express';
import { createCompanyController } from '../controllers/companies/companies.controllers';

const companiesRoutes = Router()

companiesRoutes.post('',/* Colocar middleware de admin*/ createCompanyController)
companiesRoutes.get('')
companiesRoutes.patch('')
companiesRoutes.delete('')

export default companiesRoutes