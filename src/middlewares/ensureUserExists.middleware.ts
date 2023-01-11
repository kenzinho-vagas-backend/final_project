import { Request, Response, NextFunction } from 'express'
import { User } from '../entities/users.entity'
import AppDataSource from '../data-source'
import AppError from '../errors/AppError'

const ensureUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const { email }: { email: string } = req.body

    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy({
        email: email
    })

    if (user) {
        throw new AppError('User already exists', 400)
    }
    return next()
}

export default ensureUserExists