import AppDataSource from "../../data-source"
import { Job } from "../../entities/jobs.entity"

export const createJobService = async (data) => {
    const jobRepository = AppDataSource.getRepository(Job)
    const newJob = jobRepository.create(data)
    const createdJob = await jobRepository.save(newJob)

    console.log('DATA', data)

    return createdJob
}