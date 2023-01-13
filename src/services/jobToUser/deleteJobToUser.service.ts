import AppDataSource from '../../data-source'
import { UserJob } from '../../entities/usersJobs.entity'

const deleteJobToUserService = async (JobToUserid: string): Promise<object> => {

    const userJobRepo =  AppDataSource.getRepository(UserJob)

    await userJobRepo.delete({id: JobToUserid})

    return {message: 'Vaga deletada com sucesso!'}
}

export default deleteJobToUserService