import AppDataSource from '../../data-source'
import AppError from '../../errors/AppError'
import { User } from '../../entities/users.entity'

export const getUserService = async (userID: string) => {
    const usersRepository = AppDataSource.getRepository(User)

    const foundUser = usersRepository.findOneBy({
        id: userID
    })

    if (!foundUser) {
        throw new AppError('User invalid', 403)
    }

    return foundUser
}