import { Request, Response } from 'express';
import { ICompanyRequest } from '../../interfaces/company.interface';
import { createCompanyService } from '../../services/companies/createCompany.service';
import { listAllCompaniesService } from '../../services/companies/listAllCompanies.service';
import { uptadeCompanyService } from '../../services/companies/uptadeCompany.service';

const createCompanyController = async (req: Request, res: Response) => {
    const companyData: ICompanyRequest = req.body
    const newCompany =  await createCompanyService(companyData)
    return res.status(201).json(newCompany) 
}

const listAllCompaniesController = async (req: Request, res: Response) => {
    const companies = await listAllCompaniesService()
    return res.status(200).json(companies)
}

const uptadeCompanyController = async (req: Request, res: Response) => {
    const companyData: ICompanyRequest = req.body
    const companyId: string = req.params.id
    const companyUpdated = await uptadeCompanyService(companyData, companyId)
    return res.status(200).json(companyUpdated)
}

const deleteCompanyController = async (req: Request, res: Response) => {
    
}

export { createCompanyController, listAllCompaniesController, uptadeCompanyController }