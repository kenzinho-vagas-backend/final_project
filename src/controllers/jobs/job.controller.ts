import { getCandidatesJobService } from './../../services/jobs/getCandidatesJob.service';
import { getTechnologiesJobsService } from './../../services/jobs/getTechnologiesJobs.service';
import { getCompanyJobsService } from './../../services/jobs/getCompanyJobs.service';
import { getAllJobsService } from './../../services/jobs/getAllJobs.service';
import { updateJobService } from './../../services/jobs/updateJob.service';
import { createJobService } from "../../services/jobs/createJob.service";
import { Request, Response } from "express";
import { deleteJobService } from '../../services/jobs/deleteJob.service';

export const createJobController = async (req: Request, res: Response) => {
  const data = req.body;
  const response = await createJobService(data);

  return res.status(201).json(response);
};

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
    await deleteJobService(jobId)

    return res.status(200).send()
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