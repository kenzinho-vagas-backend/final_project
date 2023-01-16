import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'

const listAllCompaniesService = async (): Promise<Company[]> => {
    const companyRepository = AppDataSource.getRepository(Company)
    const companies = await companyRepository.find()

    return companies
}

export { listAllCompaniesService }