import AppDataSource from '../../data-source'
import { Job } from '../../entities/jobs.entity'
import { User } from '../../entities/users.entity'
import { UserJob } from '../../entities/usersJobs.entity'
import AppError from '../../errors/AppError'

export const getCandidatesJobService = async (id: string, userId: string) => {
    const jobRepository = AppDataSource.getRepository(Job)
    const userJobRepository = AppDataSource.getRepository(UserJob)
    const userRepository = AppDataSource.getRepository(User)

    const job = await jobRepository.findOne({
        where: {
            id: id
        },
        relations: {
            companies: true
        }
    })

    // const searchUser = await userRepository.findOne({
    //     where: {
    //         id: userId
    //     },
    //     relations: {
    //         companies: true
    //     }
    // })

    const serachcompany = await userJobRepository.findOne({
        where: {
            user: {id: userId}
        }
    })
    
    if (!job) {
        throw new AppError('Job not found', 404)
    }

    if(job.companies.id === serachcompany.id){
        throw new AppError('deu erro!', 404)
    }

    const candidates = await jobRepository.createQueryBuilder('jobs')
        .innerJoinAndSelect('jobs.userJob', 'userJob')
        .innerJoinAndSelect('userJob.user', 'candidates')
        .where('jobs.id = :id_job', { id_job: id })
        .getOne()
    
    return candidates
}