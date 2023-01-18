import AppDataSource from '../../data-source'
import { Job } from '../../entities/jobs.entity'
import { User } from '../../entities/users.entity'
import { UserJob } from '../../entities/usersJobs.entity'
import { IUserJobResponse } from '../../interfaces/job.interface'
import AppError from '../../errors/AppError'

const createJobToUserService = async (jobUser: IUserJobResponse | any, userId: string): Promise<IUserJobResponse | any> => {
    
    const userRepo = AppDataSource.getRepository(User)
    const jobRepo = AppDataSource.getRepository(Job)
    const jobToUserRepo = AppDataSource.getRepository(UserJob)

    const user = await userRepo.findOneBy({
        id: userId
    })

    const job = await jobRepo.findOneBy({
        id: jobUser.jobId
    })

    
    const jobToUser = await AppDataSource.createQueryBuilder().
    select('usersJobs').
    from(UserJob, 'usersJobs').
    where('usersJobs.userId = :userId', {userId:  user.id}).
    andWhere('usersJobs.jobId = :jobId', {jobId: job.id}).
    getOne()

  
    if(jobToUser) {
        throw new AppError('Job has already been saved', 409)
    }
 
    const newUserJob = jobToUserRepo.create(jobUser)

    const userJobSaved = {...newUserJob, user, job}

    await jobToUserRepo.save(userJobSaved)
    
    delete userJobSaved.user

    return userJobSaved
}

export default createJobToUserService