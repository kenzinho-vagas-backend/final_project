import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors/AppError";
import { IUserRequest } from "../interfaces/user.interface";


export const ensuranceIsUserExists = async (req: Request, res: Response, next: NextFunction) => {

    const userData: IUserRequest = req.body

    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy(
        {
            email: userData.email
        }
    )

    if(!user.isActive) {
        throw new AppError('User not found', 404)
    }

    return next()
}