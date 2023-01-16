import AppDataSource from '../../data-source'
import { User } from '../../entities/users.entity'
import AppError from '../../errors/AppError'

export const deleteUserService = async (foundUser: User): Promise<void> => {
    if (!foundUser.isActive) {
        throw new AppError('This user is already deactivated', 400)
    }

    const usersRepository = AppDataSource.getRepository(User)

    await usersRepository.softDelete(foundUser.id)
    await usersRepository.save({...foundUser, isActive: false})
}