import { Router } from 'express';
import { createCompanyController } from '../controllers/companies/companies.controllers';

const companiesRoutes = Router()

companiesRoutes.post('/companies', createCompanyController)
companiesRoutes.get('/companies')
companiesRoutes.patch('/companies')
companiesRoutes.delete('/companies')

export { companiesRoutes }