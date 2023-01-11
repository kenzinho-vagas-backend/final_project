import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'

const deleteCompanyService = async (companyId: string) => {
    const companyRepository = AppDataSource.getRepository(Company)
    await companyRepository.delete({ id: companyId})
}

export { deleteCompanyService }