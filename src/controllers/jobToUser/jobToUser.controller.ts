import { Request, Response } from 'express'
import createJobToUserService from '../../services/jobToUser/createJobUser.service'
import listJobToUserService from '../../services/jobToUser/listJobToUser.service'
import deleteJobToUserService from '../../services/jobToUser/deleteJobToUser.service' 

export const createJobToUserController = async (req: Request, res: Response) => {
    const jobUser = req.body
    const userId = req.user.id
    const response = await createJobToUserService(jobUser, userId)

    return res.status(201).json(response)
}

export const listJobToUserController = async (req: Request, res: Response) => {
    const userId: string = req.user.id

    const response = await listJobToUserService(userId)

    return res.status(200).json(response)
}

export const deleteJobToUserController = async (req: Request, res: Response) => {
    const JobToUserid: string = req.params.id
    const response = await deleteJobToUserService(JobToUserid)

    return res.status(204).json(response)
}