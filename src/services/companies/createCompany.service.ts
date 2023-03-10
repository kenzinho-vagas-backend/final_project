import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import AppError from '../../errors/AppError'
import { ICompanyRequest, ICompanyResponse } from '../../interfaces/company.interface'
import { companyWithIdSerializer } from '../../schemas/companies/companies.schemas'

const createCompanyService = async (companyData: ICompanyResponse| any, userId: string): Promise<ICompanyRequest> => {
    const companyRepository = AppDataSource.getRepository(Company)

    const company = await companyRepository.findOneBy({
        companyName: companyData.companyName
    })

    
    if(company) {
        throw new AppError('Company already exists', 409)
    }
    
    const userCompany = {...companyData, user: userId}
    
    
    const newCompany = companyRepository.create(userCompany)
    await companyRepository.save(newCompany)
    
    const returnedCreateCompany = await companyWithIdSerializer.validate(newCompany, {
        stripUnknown: true
    })

    return returnedCreateCompany
}

export { createCompanyService }