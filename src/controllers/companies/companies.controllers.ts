import { Request, Response } from 'express';
import { ICompanyRequest } from '../../interfaces/company.interface';

const createCompanyController = async (req: Request, res: Response) => {
    const companyData: ICompanyRequest = req.body
    const newCompany =  await 
    return res.status(201).json(newCompany) 
} 

export { createCompanyController }