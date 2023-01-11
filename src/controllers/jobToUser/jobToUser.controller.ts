import { Request, response, Response } from "express";
import createJobToUserService from "../../services/jobToUser/createJobUser.service";
import listJobToUserService from "../../services/jobToUser/listJobToUser.service"; 


export const createJobToUserController = async (req: Request, res: Response) => {
    const jobUser = req.body
    const response = await createJobToUserService(jobUser)

    return res.status(201).json(response)
}

export const listJobToUserController = async (req: Request, res: Response) => {
    const response = await listJobToUserService()
    return res.status(200).json(response)
}