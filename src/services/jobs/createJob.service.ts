import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import { Job } from '../../entities/jobs.entity'
import { Technology } from '../../entities/technologies.entity'
import { TechJob } from '../../entities/technologiesJobs.entity'
import AppError from '../../errors/AppError'
import { IJobRequest, IJobResponse } from '../../interfaces/job.interface'
import { returnJobSerializer } from '../../schemas/jobs/job.serializer'


export const createJobService = async (data: IJobRequest | any): Promise<IJobResponse | any>=> {
    
    const jobRepository = AppDataSource.getRepository(Job)
    const companyRepository = AppDataSource.getRepository(Company)


    const company = companyRepository.findOneBy({ id: data.companies})
    
    if (!company) {
        throw new AppError('Company not found', 404)
    }

    const noTechs = {
        wage: data.wage,
        modality: data.modality,
        jobLevel: data.jobLevel,
        jobUrl: data.jobUrl,
        companies: data.companies,
    } 

    const newJob = {...noTechs}

    const createNewJob = jobRepository.create(newJob)

    await jobRepository.save(createNewJob)

    /////////////////////////////////////////////////////////////////////////////



    const techRepository = AppDataSource.getRepository(Technology)
    const techToJobRepository = AppDataSource.getRepository(TechJob)

    const techArray = data.techs
    const searchTech = await techRepository.findOneBy({tech: techArray})
    
    if(!searchTech){
        const newTech = techRepository.create({tech: techArray})
  
        await techRepository.save(newTech)

        const newTechToJob =  techToJobRepository.create(newTech)
 
        const TechToJobWithRelations = {...newTechToJob, technology: newTech, job: createNewJob}

        return await techToJobRepository.save(TechToJobWithRelations)
    }

    const newTechToJob =  techToJobRepository.create(searchTech)
 
    const TechToJobWithRelations = {technology: searchTech, job: createNewJob}

    await techToJobRepository.save(TechToJobWithRelations)
   
    ///////////////////////////////////////////////////////////////////////////

    const returnedCreateJob = await returnJobSerializer.validate(createNewJob, {
        stripUnknown: true
    })

    return returnedCreateJob
}