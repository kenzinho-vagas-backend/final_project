import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import { Job } from '../../entities/jobs.entity'
import AppError from '../../errors/AppError'
import { IJobRequest, IJobResponse } from '../../interfaces/job.interface'
import { returnJobSerializer } from '../../schemas/jobs/job.serializer'


export const createJobService = async (data: IJobRequest | any): Promise<IJobResponse> => {
    
    
    const jobRepository = AppDataSource.getRepository(Job)
    const companyRepository = AppDataSource.getRepository(Company)
    const company = companyRepository.findOneBy({ id: data.companies})
    
    if (!company) {
        throw new AppError('Company not found', 404)
    }

    const newJob = {...data}

    const createNewJob = jobRepository.create(newJob)

    await jobRepository.save(createNewJob)
   
    const returnedCreateJob = await returnJobSerializer.validate(createNewJob, {
        stripUnknown: true
    })

    return returnedCreateJob
}