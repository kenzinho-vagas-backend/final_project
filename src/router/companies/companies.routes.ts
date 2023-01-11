import { Router } from 'express';
import { createCompanyController, deleteCompanyController, listAllCompaniesController, uptadeCompanyController } from '../../controllers/companies/companies.controllers';
import { ensuranceIsOwnerCompany, ensuranceUserIsAdm } from '../../middlewares';
import {ensureAuthMiddleware} from '../../middlewares/ensureAuth.middleware';

const companiesRoutes = Router()

companiesRoutes.post('',ensureAuthMiddleware, ensuranceUserIsAdm, createCompanyController)
companiesRoutes.get('', listAllCompaniesController)
companiesRoutes.patch('/:id',ensureAuthMiddleware, ensuranceUserIsAdm, ensuranceIsOwnerCompany, uptadeCompanyController)
companiesRoutes.delete('/:id', ensureAuthMiddleware, ensuranceUserIsAdm, ensuranceIsOwnerCompany,deleteCompanyController)

export default companiesRoutes