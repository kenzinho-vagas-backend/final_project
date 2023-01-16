import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import AppError from '../../errors/AppError'
import { ICompanyRequest, ICompanyResponse } from '../../interfaces/company.interface'
import { companyWithIdSerializer } from '../../schemas'

const uptadeCompanyService = async (companyData: ICompanyRequest, companyId: string, userId: string): Promise<ICompanyResponse> => {
    const companyRepository = AppDataSource.getRepository(Company)
    const company = await companyRepository.findOneBy({ id: companyId})

    
    const searchCompany = await companyRepository.findOne({
        where: {id: companyId},
        relations: {
            user: true
        }
    })

    if(searchCompany.user.id !== userId) {
        throw new AppError('This company does not belong', 403)
    }
    
    if(!company) {
        throw new AppError('Company not found', 404)
    }

    const updatedCompany = companyRepository.create({
        ...company,
        ...companyData
    })

    await companyRepository.save(updatedCompany)

    const returnedUpdateCompany = await companyWithIdSerializer.validate(updatedCompany, {
        stripUnknown: true
    })

    return returnedUpdateCompany

}

export { uptadeCompanyService }