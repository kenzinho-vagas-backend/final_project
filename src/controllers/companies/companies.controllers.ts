import { Request, Response } from 'express';

const createCompanyController = async (req: Request, res: Response) => {
    const companyData = req.body
    const newCompany =  await 
    return res.status(201).json(newCompany) 
} 

export { createCompanyController }