import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import AppError from '../../errors/AppError'

const deleteCompanyService = async (companyId: string, userId: string) => {
    const companyRepository = AppDataSource.getRepository(Company)

    const searchCompany = await companyRepository.findOne({
        where: {id: companyId},
        relations: {
            user: true
        }
    })

    if(searchCompany.user.id !== userId) {
        throw new AppError('This company does not belong', 403)
    }

    await companyRepository.delete({ id: companyId})

}

export { deleteCompanyService }