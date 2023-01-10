import { Request, Response } from 'express';
import { ICompanyRequest } from '../../interfaces/company.interface';
import { createCompanyService } from '../../services/companies/createCompany.service';

const createCompanyController = async (req: Request, res: Response) => {
    const companyData: ICompanyRequest = req.body
    console.log(companyData)
    const newCompany =  await createCompanyService(companyData)
    return res.status(201).json(newCompany) 
}

const listAllCompaniesController = async (req: Request, res: Response) => {
    const companies = await
    return res.status(201).json(companies)
}

export { createCompanyController, listAllCompaniesController }