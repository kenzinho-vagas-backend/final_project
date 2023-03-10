import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import { Job } from '../../entities/jobs.entity'
import { User } from '../../entities/users.entity'
import { UserJob } from '../../entities/usersJobs.entity'
import AppError from '../../errors/AppError'

export const getCandidatesJobService = async (id: string, userId: string) => {
    const jobRepository = AppDataSource.getRepository(Job)
    const userJobRepository = AppDataSource.getRepository(UserJob)
    const userRepository = AppDataSource.getRepository(User)
    const companiesRepository = AppDataSource.getRepository(Company)

    const job = await jobRepository.findOne({
        where: {
            id: id
        },
        relations: {
            companies: true
        }
    })
    
    if (!job) {
        throw new AppError('Job not found', 404)
    }

    const companyNam = job.companies.companyName

    const searchcompany = await companiesRepository.findOne({
        where: {
            companyName: companyNam
        },
        relations:{
            user: true
        }
        
    })

    if(!searchcompany) {
        throw new AppError('Company not found', 404)   
    }
    
    if(searchcompany.user.id !== userId){
        throw new AppError('This company does not belong', 403)
    }
   

    const candidates = await jobRepository.createQueryBuilder('jobs')
        .innerJoinAndSelect('jobs.userJob', 'userJob')
        .innerJoinAndSelect('userJob.user', 'candidates')
        .where('jobs.id = :id_job', { id_job: id })
        .getOne()
    
    return candidates
}