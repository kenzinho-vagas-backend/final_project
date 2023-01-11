import { Router } from 'express';
import { createCompanyController, listAllCompaniesController, uptadeCompanyController } from '../controllers/companies/companies.controllers';

const companiesRoutes = Router()

companiesRoutes.post('',/* Colocar middleware de admin*/ createCompanyController)
companiesRoutes.get('', listAllCompaniesController)
companiesRoutes.patch('/:id', /* Colocar middleware de admin*/ uptadeCompanyController)
companiesRoutes.delete('', /* Colocar middleware de admin*/)

export default companiesRoutes