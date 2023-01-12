import AppError from '../../errors/AppError'
import { User } from '../../entities/users.entity'

export const getUserService = async (foundUser: User, id: string): Promise<User> => {
    if (id !== foundUser.id) {
        throw new AppError('User invalid', 403)
    }

    return foundUser
}