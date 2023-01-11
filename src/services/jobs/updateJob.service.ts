import AppDataSource from '../../data-source'
import { Job } from '../../entities/jobs.entity'
import AppError from '../../errors/AppError'

export const updateJobService = async (data, id) => {
    const jobRepository = AppDataSource.getRepository(Job)
    const job = await jobRepository.findOneBy({ id: id })

    if (!job) {
        throw new AppError('Job not found, cant update')
    } 

    const updatedJob = jobRepository.create({
        ...job,
        ...data
    })

    await jobRepository.save(updatedJob)

    return updatedJob
}