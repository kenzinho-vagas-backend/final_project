import { NextFunction, Request, Response } from 'express'
import AppDataSource from '../data-source'
import { User } from '../entities/users.entity'
import AppError from '../errors/AppError'

export const ensuranceUserIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {

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
