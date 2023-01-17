import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import AppError from '../../errors/AppError'

export const getCompanyJobsService = async (id: string) => {
    const companyRepository = AppDataSource.getRepository(Company)

    const company = await companyRepository.findOneBy({ id: id })
    
    if (!company) {
        throw new AppError('Company not found', 404)
    }

    const jobs = await companyRepository.createQueryBuilder('companies')
        .innerJoinAndSelect('companies.job', 'jobs')
        .where('companies.id = :id_company', { id_company: id })
        .getOne()
    return jobs
}