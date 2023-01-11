import AppDataSource from "../../data-source";
import { Job } from "../../entities/jobs.entity";
import { User } from "../../entities/users.entity";
import { UserJob } from "../../entities/usersJobs.entity";
import { IUserJobRequest } from "../../interfaces/job.interface";


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

    return {message: 'Vaga salva com sucesso!'}
}

export default createJobToUserService