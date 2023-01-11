import AppDataSource from "../../data-source"
import { Job } from "../../entities/jobs.entity"

export const deleteJobService = async (id) => {
    const jobRepository = AppDataSource.getRepository(Job)
    await jobRepository.delete({id: id})
}