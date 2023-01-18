import AppDataSource from '../../data-source'
import { Company } from '../../entities/companies.entity'
import { Job } from '../../entities/jobs.entity'
import { Technology } from '../../entities/technologies.entity'
import { TechJob } from '../../entities/technologiesJobs.entity'
import AppError from '../../errors/AppError'
import { IJobRequest, IJobResponse } from '../../interfaces/job.interface'
import { returnJobSerializer } from '../../schemas/jobs/job.serializer'


export const createJobService = async (data: IJobRequest | any, userId: string): Promise<IJobResponse | any>=> {
    
    const jobRepository = AppDataSource.getRepository(Job)
    const companyRepository = AppDataSource.getRepository(Company)
    const techRepository = AppDataSource.getRepository(Technology)
    const techToJobRepository = AppDataSource.getRepository(TechJob)

    const company = await companyRepository.findOneBy({ id: data.companies})

    
    if (!company) {
        throw new AppError('Company not found', 404)
    }
    
    const searchCompany = await companyRepository.findOne({
        
        where: {id: data.companies},
        relations: {
            user: true
        }
    })
    
    if (searchCompany.user.id !== userId) {
        throw new AppError('This company does not belong', 403)
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
  
    const validationtech = data.techs.includes(",")
    const techArray = data.techs
  
    if(!validationtech){
        const searchTech = await techRepository.findOneBy({tech: techArray.trim().toLowerCase()})
       
        if(!searchTech){
            const newTech = techRepository.create({tech: techArray.trim().toLowerCase()})
            await techRepository.save(newTech)

            const newTechToJob = techToJobRepository.create()
            await techToJobRepository.save(newTechToJob)
            await techToJobRepository.update(
                {
                    id: newTechToJob.id
                },
                {
                    technology: newTech,
                    job: createNewJob
                }
            )
  
            const jobsCreated = await jobRepository.findOneBy({id: createNewJob.id})
          
            const returnedCreateJob = await returnJobSerializer.validate({...jobsCreated, techs: data.techs}, {
                stripUnknown: true
            })
          
            return returnedCreateJob
   
        }

        const newTechToJob = techToJobRepository.create()
        await techToJobRepository.save(newTechToJob)
        await techToJobRepository.update(
            {
                id: newTechToJob.id
            },
            {
                technology: searchTech,
                job: createNewJob
            }
        )
  
        const jobsCreated = await jobRepository.findOneBy({id: createNewJob.id})
          
        const returnedCreateJob = await returnJobSerializer.validate({...jobsCreated, techs: data.techs}, {
            stripUnknown: true
        })
          
        return returnedCreateJob
    } 
  
    techArray.split(",").forEach(async (element: string) => {
        const searchTech = await techRepository.findOneBy({tech: element.trim().toLowerCase()})
       
        if(!searchTech){
            const newTech = techRepository.create({tech: element.trim().toLowerCase()})
     
            await techRepository.save(newTech)

            const newTechToJob = techToJobRepository.create()
        
            await techToJobRepository.save(newTechToJob)

            return await techToJobRepository.update(
                {
                    id: newTechToJob.id
                },
                {
                    technology: newTech,
                    job: createNewJob
                }
            )
        }

        const newTechToJob = techToJobRepository.create()
        
        await techToJobRepository.save(newTechToJob)

        return await techToJobRepository.update(
            {
                id: newTechToJob.id
            },
            {
                technology: searchTech,
                job: createNewJob
            }
        )
        
    });

    const jobsCreated = await jobRepository.findOneBy({id: createNewJob.id})
          
    const returnedCreateJob = await returnJobSerializer.validate({...jobsCreated, techs: data.techs}, {
        stripUnknown: true
    })
          
    return returnedCreateJob
 
}