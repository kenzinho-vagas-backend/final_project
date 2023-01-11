import { NextFunction, Request, Response } from "express";
import { request } from "http";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors/AppError";

export const ensuranceUserIsAdm = async (req: Request, res: Response, next: NextFunction) => {

    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy(
        {
            id: req.user.id
        }
    )

    if (!user.isAdm) {
        throw new AppError ('Missing adm permissions', 403)
    }

    return next()
}