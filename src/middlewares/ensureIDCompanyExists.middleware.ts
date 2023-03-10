import { Request, Response, NextFunction } from 'express'
import AppDataSource from '../data-source'
import AppError from '../errors/AppError'
import { Company } from '../entities/companies.entity'

export const ensureIDCompanyExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const companyRepository = AppDataSource.getRepository(Company)

    const foundCompany = await companyRepository.findOneBy({
        id: req.params.id
    })

    if (!foundCompany) {
        throw new AppError('Company does not exists', 404)
    }  
    
    res.locals.foundCompany = foundCompany
    return next()
}