import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import { Job } from '../../entities/jobs.entity'
import AppError from '../../errors/AppError'
import { Technology } from '../../entities/technologies.entity'

export const createJobService = async (data) => {
    const jobRepository = AppDataSource.getRepository(Job)
    const companyRepository = AppDataSource.getRepository(Company)
    const company = companyRepository.findOneBy({ id: data.companyId })
    const techRepo = AppDataSource.getRepository(Technology)
    // const techJobRepo = AppDataSource.getRepository()
    
    if (!company) {
        throw new AppError('Company not found', 404)
    }

    // const noTechs = {
    //     wage: data.wage,
    //     modality: data.modality,
    //     jobLevel: data.jobLevel,
    //     jobUrl: data.jobUrl
    // }

    const newJob = jobRepository.create(data)
    await jobRepository.save(newJob)

    const teste = [data.techs]

    teste.forEach(async (element)  =>  {
        const newTech = techRepo.create(element)
        console.log(newTech)
        await techRepo.save(newTech)

        const userTechJObs = {...element, newTech, newJob }

        // await techJobRepo.save(techJobRepo)
    });


    return {tetse: "teste"}


}