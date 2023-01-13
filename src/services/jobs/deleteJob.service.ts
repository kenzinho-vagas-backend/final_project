import AppDataSource from '../../data-source'
import { Job } from '../../entities/jobs.entity'
import { IUpdateJobRequest } from '../../interfaces/job.interface'

export const deleteJobService = async (id: string, data:IUpdateJobRequest) => {
    const jobRepository = AppDataSource.getRepository(Job)
    await jobRepository.delete({id: id})
}