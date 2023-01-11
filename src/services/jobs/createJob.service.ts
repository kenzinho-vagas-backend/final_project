import AppDataSource from "../../data-source"
import { Company } from "../../entities/companies.entity"
import { Job } from "../../entities/jobs.entity"
import AppError from "../../errors/AppError"

export const createJobService = async (data) => {
    const jobRepository = AppDataSource.getRepository(Job)
    const companyRepository = AppDataSource.getRepository(Company)
    const company = companyRepository.findOneBy({ id: data.companyId })
    
    if (!company) {
        throw new AppError("Company not found", 404)
    }

    const newJob = jobRepository.create(data)
    const createdJob = await jobRepository.save(newJob)

    return createdJob
}