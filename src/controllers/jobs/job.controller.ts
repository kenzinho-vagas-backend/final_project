import { getCandidatesJobService, getTechnologiesJobsService, getCompanyJobsService, getAllJobsService, updateJobService,createJobService, deleteJobService } from './../../services/'
import { Request, Response } from 'express'

export const createJobController = async (req: Request, res: Response) => {
  const data = req.body
  const userId = req.user.id
  const response = await createJobService(data, userId)

  return res.status(201).json(response)
}

export const getAllJobsController = async (req: Request, res: Response) => {
    const jobs = await getAllJobsService()

    return res.status(200).json(jobs)
}

export const updateJobController = async (req: Request, res: Response) => {
    const data = req.body
    const id = req.params.id
    const response = await updateJobService(data, id)

    return res.status(200).json(response)
}

export const deleteJobController = async (req: Request, res: Response) => {
    const jobId = req.params.id
    const dataJob = req.body
    await deleteJobService(jobId, dataJob)

    return res.status(204).send()
}

export const getCompanyJobsController = async (req: Request, res: Response) => {
    const companyId = req.params.id
    const jobs = await getCompanyJobsService(companyId)

    return res.status(200).json(jobs)
}

export const getTechnologiesJobsController = async (req: Request, res: Response) => {
    const technologyId = req.params.id
    const jobs = await getTechnologiesJobsService(technologyId)

    return res.status(200).json(jobs)
}

export const getCandidatesJobController = async (req: Request, res: Response) => {
    const jobId = req.params.id
    const candidates = await getCandidatesJobService(jobId)

    return res.status(200).json(candidates)
}