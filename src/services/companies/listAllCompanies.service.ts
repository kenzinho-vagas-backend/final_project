import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import { allCompaniesResponseSerializer } from '../../schemas/companies/companies.schemas'

const listAllCompaniesService = async (): Promise<Company[]> => {
    const companyRepository = AppDataSource.getRepository(Company)
    const companies = await companyRepository.find()

    // const companiesValid = await allCompaniesResponseSerializer.validate(companies)

    return companies
}

export { listAllCompaniesService }