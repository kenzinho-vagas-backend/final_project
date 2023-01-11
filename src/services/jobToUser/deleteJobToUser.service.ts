import AppDataSource from "../../data-source"
import { UserJob } from "../../entities/usersJobs.entity"

const deleteJobToUserService = async (jobId: string) => {
    const idUser = 1

    // const jobToUserRepo = AppDataSource.getRepository(UserJob)

    await AppDataSource.createQueryBuilder()
    .delete()
    .from(UserJob)
    .where("id = :id", { id: jobId })
    .andWhere("id = :id", { id: idUser })
    .execute()

    return {message: 'Vaga deletada com sucesso!'}
}

export default deleteJobToUserService