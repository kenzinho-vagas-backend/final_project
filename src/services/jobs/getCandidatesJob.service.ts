import AppDataSource from '../../data-source'
import { Job } from '../../entities/jobs.entity'
import AppError from '../../errors/AppError'

export const getCandidatesJobService = async (id: string) => {
    const jobRepository = AppDataSource.getRepository(Job)

    const job = await jobRepository.findOneBy({ id: id })
    
    if (!job) {
        throw new AppError('Job not found', 404)
    }

    const candidates = await jobRepository.createQueryBuilder('jobs')
        .innerJoinAndSelect('jobs.userJob', 'userJob')
        .innerJoinAndSelect('userJob.user', 'candidates')
        .where('jobs.id = :id_job', { id_job: id })
        .getOne()
    
    return candidates
}