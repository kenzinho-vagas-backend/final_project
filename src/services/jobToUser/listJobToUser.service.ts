import AppDataSource from "../../data-source"
import { Job } from "../../entities/jobs.entity"
import { UserJob } from "../../entities/usersJobs.entity"

const listJobToUserService = async (userId: string) => {

    console.log(userId)

    const jobToUserRepo = AppDataSource.getRepository(UserJob)

    const searchJobs = await jobToUserRepo.findOne({
        where:{
            id: userId
        },
        relations: {
            job: true
        }
    })

    console.log(searchJobs)

    return searchJobs.job
}

export default listJobToUserService