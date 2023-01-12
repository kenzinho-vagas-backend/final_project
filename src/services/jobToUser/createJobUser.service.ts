import AppDataSource from '../../data-source'
import { Job } from '../../entities/jobs.entity'
import { User } from '../../entities/users.entity'
import { UserJob } from '../../entities/usersJobs.entity'
import { IUserJobRequest } from '../../interfaces/job.interface'
import AppError from '../../errors/AppError'

const createJobToUserService = async (jobUser: IUserJobRequest | any): Promise<object> => {
    
    const userRepo = AppDataSource.getRepository(User)
    const jobRepo = AppDataSource.getRepository(Job)
    const jobToUserRepo = AppDataSource.getRepository(UserJob)

    const user = await userRepo.findOneBy({
        id: jobUser.userId
    })

    const job = await jobRepo.findOneBy({
        id: jobUser.jobId
    })

   const jobToUser = await jobToUserRepo.findOneBy({
        id: jobUser.id
   })

   if(jobToUser) {
    throw new AppError('Job already exists', 409)
   }

    const newJobToUser = jobToUserRepo.create(jobUser)

    await jobToUserRepo.save(newJobToUser)

    await jobToUserRepo.update(
        {
            id: jobUser.id
        },
        {
            user: user,
            job: job,
        }
    )

    return { message: 'Job opportunity saved succesfully!' }
}

export default createJobToUserService