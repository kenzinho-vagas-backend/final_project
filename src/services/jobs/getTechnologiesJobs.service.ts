import AppDataSource from "../../data-source"
import { Technology } from "../../entities/technologies.entity"
import AppError from "../../errors/AppError"

export const getTechnologiesJobsService = async (id) => {
    const technologyRepository = AppDataSource.getRepository(Technology)
    const technology = await technologyRepository.findOneBy({ id: id })
     

    if (!technology) {
        throw new AppError('Technology not found', 404)
    }

    const jobs = await technologyRepository.createQueryBuilder('technologies')
        .innerJoinAndSelect('technologies.techsJobs', 'techsJobs')
        .innerJoinAndSelect('techsJobs.job', 'jobs')
        .where('technologies.id = :id_tech', { id_tech: id })
        .getOne()
    
    return jobs
    
}