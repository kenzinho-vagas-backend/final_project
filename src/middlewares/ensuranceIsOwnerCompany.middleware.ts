import { NextFunction, Request, Response } from 'express'
import AppDataSource from '../data-source'
import { Company } from '../entities/companies.entity'
import AppError from '../errors/AppError'

export const ensuranceIsOwnerCompanyMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const companyRespository = AppDataSource.getRepository(Company)
    
    const userLogged = req.user.id
       
    const company = await companyRespository.findOne({

        where: {id: req.body.companies },
        relations: {
            user: true
        }
        
    })

    console.log(company.user.id)
    console.log(userLogged)
    console.log(req.body.companies)

    if (company.user.id !== userLogged) {
        throw new AppError('Missing permission adm', 403)
    }
    
    return next()
}