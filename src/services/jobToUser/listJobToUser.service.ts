import AppDataSource from '../../data-source'
import { Job } from '../../entities/jobs.entity'
import { UserJob } from '../../entities/usersJobs.entity'
import { User } from '../../entities/users.entity'

const listJobToUserService = async (userId: string) => {

    const UserJobRepo = AppDataSource.getRepository(UserJob)

    const userRepo = AppDataSource.getRepository(User) 

    const searchUser = await userRepo.findOne({
        where: {
            id: userId
        },
        relations: {
            userJob: true
        }
    })

    return searchUser.userJob
    
}

export default listJobToUserService