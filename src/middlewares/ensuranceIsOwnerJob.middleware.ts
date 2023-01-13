import { NextFunction, Request, Response } from 'express'
import AppDataSource from '../data-source'
import { Company } from '../entities/companies.entity'
import { Job } from '../entities/jobs.entity'
import AppError from '../errors/AppError'

export const ensuranceIsOwnerJobMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const companyRespository = AppDataSource.getRepository(Company)
    const jobRepository = AppDataSource.getRepository(Job)

    const searchJob = await jobRepository.findOne({
        where: {id: req.params.id} ,
        relations: {
            companies: true
        }
    })

    console.log(searchJob.companies.id)


    const searchCompany = await companyRespository.findOne({
        where: {id: req.body.companies},
        relations: {
            user: true
        }
    })

    console.log(searchCompany.id)
    console.log(searchCompany.user.id)
    
    const userLogged = req.user.id
       
       
    if(searchJob.companies.id !== searchCompany.id || searchCompany.user.id !== userLogged) {
        throw new AppError('Missing adm permission', 403)
    }
    
    return next()
}