import AppDataSource from '../../data-source'
import { User } from '../../entities/users.entity'
import AppError from '../../errors/AppError'
import { IUserRequest } from '../../interfaces/user.interface'
import { createUserSchema } from '../../schemas/createUser.schemas'

const createUserService = async (userData: IUserRequest) => {
    try {
        const userDataValidated = await createUserSchema.validate(userData, {
            stripUnknown: true,
            abortEarly: false
        })

        const usersRepository = AppDataSource.getRepository(User)
        const createdUser = usersRepository.create(userDataValidated)
        await usersRepository.save(createdUser)

        delete createdUser.password
        return createdUser
    } catch (error) {
        throw new AppError(error, 400)
    }
}

export default createUserService