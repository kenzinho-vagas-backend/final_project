import AppDataSource from '../../data-source';
import { Company } from '../../entities/companies.entity';
import AppError from '../../errors/AppError';
import { ICompanyRequest } from '../../interfaces/company.interface';

const uptadeCompanyService = async (companyData: ICompanyRequest, companyId: string): Promise<Company> => {
    const companyRepository = AppDataSource.getRepository(Company)
    const company = await companyRepository.findOneBy({ id: companyId})

    if(!company) {
        throw new AppError("Company not found", 404)
    }

    const updatedCompany = companyRepository.create({
        ...company,
        ...companyData
    })

    await companyRepository.save(updatedCompany)

    return updatedCompany
}

export { uptadeCompanyService }