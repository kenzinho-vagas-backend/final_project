import { Router } from 'express';
import { createCompanyController, deleteCompanyController, listAllCompaniesController, uptadeCompanyController } from '../../controllers/companies/companies.controllers';

const companiesRoutes = Router()

companiesRoutes.post('',/* Colocar middleware de admin*/ createCompanyController)
companiesRoutes.get('', listAllCompaniesController)
companiesRoutes.patch('/:id', /* Colocar middleware de admin*/ uptadeCompanyController)
companiesRoutes.delete('/:id', /* Colocar middleware de admin*/ deleteCompanyController)

export default companiesRoutes