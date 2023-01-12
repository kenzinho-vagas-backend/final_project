import AppDataSource from '../../data-source'
import { User } from '../../entities/users.entity'

export const deleteUserService = async (foundUser: User): Promise<void> => {
    const usersRepository = AppDataSource.getRepository(User)

    await usersRepository.softDelete(foundUser.id)
    await usersRepository.save({...foundUser, isActive: false})
}