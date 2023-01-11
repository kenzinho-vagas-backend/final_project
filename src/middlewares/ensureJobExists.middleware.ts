import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Job } from "../entities/jobs.entity";
import AppError from "../errors/AppError";


export const ensureJobExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const JobRepository = AppDataSource.getRepository(Job)

    const searchJobs = await JobRepository.findOneBy(
        {
            id: req.params.id
        }
    )

    if(!searchJobs) {
        throw new AppError('Job not found', 404)
    }    
    
    return next()
}