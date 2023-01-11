import { Request, Response } from "express";
import createJobToUserService from "../../services/jobToUser/createJobUser.service";


export const createJobToUserController = async (req: Request, res: Response) => {
    const jobUser = req.body
    const response = await createJobToUserService(jobUser)

    return res.status(201).json(response)
}