import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import { ICompanyRequest } from '../../interfaces/company.interface'
import { companyWithIdSerializer } from '../../schemas/companies/companies.schemas'

const createCompanyService = async (companyData: ICompanyRequest): Promise<Company> => {
    const companyRepository = AppDataSource.getRepository(Company)
    const newCompany = companyRepository.create(companyData)
    await companyRepository.save(newCompany)

    return newCompany
}

export { createCompanyService }