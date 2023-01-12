import { Request, Response, NextFunction } from 'express'
import { User } from '../entities/users.entity'
import { IUserRequest } from '../interfaces/user.interface'
import AppDataSource from '../data-source'
import AppError from '../errors/AppError'

export const ensureEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUserRequest = req.body
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy({
        email: userData.email
    })

    if (user) {
        if (userData.name) {
            throw new AppError('User already exists', 409)
        }

        res.locals.user = user
        return next()
    }
    return next()
}