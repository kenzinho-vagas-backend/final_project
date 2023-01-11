import AppDataSource from "../../data-source"
import { Job } from "../../entities/jobs.entity"

export const getAllJobsService = async () => {
    const jobRepository = AppDataSource.getRepository(Job)
    const jobs = await jobRepository.find()
    return jobs
}