import { Request, Response } from 'express'
import { IUserRequest } from '../../interfaces/user.interface'
import { createUserService } from '../../services'

export const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body

    const createdUser = await createUserService(userData)
    return res.status(201).json(createdUser)
}