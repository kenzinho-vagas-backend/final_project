import AppDataSource from "../../data-source"
import { Job } from "../../entities/jobs.entity"
import { UserJob } from "../../entities/usersJobs.entity"

const listJobToUserService = async (userId: string) => {

    const jobToUserRepo = AppDataSource.getRepository(UserJob)

    const searchJobs = await jobToUserRepo.findOne({
        where:{
            id: userId
        },
        relations: {
            job: true
        }
    })

    return searchJobs.job
}

export default listJobToUserService