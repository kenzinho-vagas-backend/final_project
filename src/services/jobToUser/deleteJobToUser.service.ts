import AppDataSource from '../../data-source'
import { UserJob } from '../../entities/usersJobs.entity'
import AppError from '../../errors/AppError'

const deleteJobToUserService = async (JobToUserid: string): Promise<object> => {

    const userJobRepo =  AppDataSource.getRepository(UserJob)

    const searchJobToUser = await userJobRepo.findOneBy({
        id: JobToUserid
    })

    if(!searchJobToUser) {
        throw new AppError('Vaga não existe', 404)
    }

    await userJobRepo.delete({id: JobToUserid})

  

    return {message: 'Vaga deletada com sucesso!'}
}

export default deleteJobToUserService