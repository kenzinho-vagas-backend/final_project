import { Request, Response } from 'express'
import { ICompanyRequest } from '../../interfaces/company.interface'
import { createCompanyService } from '../../services/companies/createCompany.service'
import { deleteCompanyService } from '../../services/companies/deleteCompany.service'
import { listAllCompaniesService } from '../../services/companies/listAllCompanies.service'
import { uptadeCompanyService } from '../../services/companies/uptadeCompany.service'

const createCompanyController = async (req: Request, res: Response) => {
    const companyData: ICompanyRequest = req.body
    const userId = req.user.id
    const newCompany =  await createCompanyService(companyData, userId)
    return res.status(201).json(newCompany) 
}

const listAllCompaniesController = async (req: Request, res: Response) => {
    const companies = await listAllCompaniesService()
    return res.status(200).json(companies)
}

const uptadeCompanyController = async (req: Request, res: Response) => {
    const companyData: ICompanyRequest = req.body
    const companyId: string = req.params.id
    const userId: string = req.user.id
    const companyUpdated = await uptadeCompanyService(companyData, companyId, userId)
    return res.status(200).json(companyUpdated)
}

const deleteCompanyController = async (req: Request, res: Response) => {
    const companyId: string = req.params.id
    const userId: string = req.user.id
    await deleteCompanyService(companyId, userId)
    return res.status(204).send()
}

export { createCompanyController, listAllCompaniesController, uptadeCompanyController, deleteCompanyController }