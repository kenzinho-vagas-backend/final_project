import { Router } from 'express'

import { createCompanyController, deleteCompanyController, listAllCompaniesController, uptadeCompanyController } from '../../controllers/companies/companies.controllers'

import { ensuranceIsOwnerCompanyMiddleware, ensuranceUserIsAdmMiddleware } from '../../middlewares'

import { ensureAuthMiddleware } from '../../middlewares/ensureAuth.middleware'

const companiesRoutes = Router()

companiesRoutes.post('',ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, createCompanyController)
companiesRoutes.get('', listAllCompaniesController)
companiesRoutes.patch('/:id',ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensuranceIsOwnerCompanyMiddleware, uptadeCompanyController)
companiesRoutes.delete('/:id', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensuranceIsOwnerCompanyMiddleware,deleteCompanyController)

export default companiesRoutes