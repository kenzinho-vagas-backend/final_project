import { Router } from 'express'

import { createCompanyController, deleteCompanyController, listAllCompaniesController, uptadeCompanyController } from '../../controllers/companies/companies.controllers'

import { ensuranceUserIsAdmMiddleware } from '../../middlewares'

import { ensureAuthMiddleware } from '../../middlewares/ensureAuth.middleware'
import { ensuranceIsOwnerCompanyMiddleware } from '../../middlewares'
import { ensureIDCompanyExistsMiddleware } from '../../middlewares/ensureIDCompanyExists.middleware'

const companiesRoutes = Router()

companiesRoutes.post('',ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, createCompanyController)
companiesRoutes.get('', listAllCompaniesController)
companiesRoutes.patch('/:id',ensureAuthMiddleware, ensureIDCompanyExistsMiddleware, ensuranceUserIsAdmMiddleware, ensuranceIsOwnerCompanyMiddleware, uptadeCompanyController)
companiesRoutes.delete('/:id', ensureAuthMiddleware, ensureIDCompanyExistsMiddleware, ensuranceUserIsAdmMiddleware, ensuranceIsOwnerCompanyMiddleware, deleteCompanyController)

export default companiesRoutes