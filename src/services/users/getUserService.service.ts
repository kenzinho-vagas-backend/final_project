import AppDataSource from '../../data-source'
import AppError from '../../errors/AppError'
import { User } from '../../entities/users.entity'

export const getUserService = async (foundUser: User): Promise<User> => {
    return foundUser
}