import AppDataSource from "../../data-source"
import { UserJob } from "../../entities/usersJobs.entity"

const deleteJobToUserService = async (jobId: string, userId: string) => {

    await AppDataSource.createQueryBuilder()
    .delete()
    .from(UserJob)
    .where("id = :id", { id: jobId })
    .andWhere("id = :id", { id: userId })
    .execute()

    return {message: 'Vaga deletada com sucesso!'}
}

export default deleteJobToUserService