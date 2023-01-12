import AppDataSource from '../../data-source'
import { User } from '../../entities/users.entity'

export const getAllUsersService = async (): Promise<User[]> => {
    const usersRepository = AppDataSource.getRepository(User)

    const allUsers = usersRepository.find()
    return allUsers
}