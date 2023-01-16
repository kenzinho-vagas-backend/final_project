import { NextFunction, Request, Response } from 'express'
import AppDataSource from '../data-source'
import { Company } from '../entities/companies.entity'
import AppError from '../errors/AppError'

export const ensuranceIsOwnerCompanyMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const companyRepository = AppDataSource.getRepository(Company)
    
    const userLogged = req.user.id
       
    const searchCompany = await companyRepository.findOne({
        where: {id: req.params.id},
        relations: {
            user: true
        }
    })

    if(searchCompany.user.id !== userLogged) {
        throw new AppError('This company does not belong', 403)
    }
    
    return next()
}