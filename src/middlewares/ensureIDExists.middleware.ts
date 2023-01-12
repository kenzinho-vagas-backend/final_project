import { Request, Response, NextFunction } from 'express'
import { User } from '../entities/users.entity'
import AppDataSource from '../data-source'
import AppError from '../errors/AppError'

export const ensureIDExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const usersRepository = AppDataSource.getRepository(User)

    const foundUser = await usersRepository.findOneBy({
        id: req.params.id
    })

    if (!foundUser) {
        throw new AppError('User invalid', 403)
    }  
    
    res.locals.foundUser = foundUser
    return next()
}