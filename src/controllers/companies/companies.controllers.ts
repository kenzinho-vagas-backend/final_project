import { Request, Response } from 'express';
import { ICompanyRequest } from '../../interfaces/company.interface';
import { createCompanyService } from '../../services/companies/createCompany.service';

const createCompanyController = async (req: Request, res: Response) => {
    const companyData: ICompanyRequest = req.body
    const newCompany =  await createCompanyService(companyData)
    return res.status(201).json(newCompany) 
} 

export { createCompanyController }