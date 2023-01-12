import { User } from '../../entities/users.entity'
import { IUserUpdate } from '../../interfaces/user.interface'
import AppError from '../../errors/AppError'
import AppDataSource from '../../data-source'
import { updateUserSerializer } from '../../schemas'

export const updateUserService = async (dataToUpdate: IUserUpdate, foundUser: User, reqID: string) => {
    try {
        const validatedDataToUpdate = await updateUserSerializer.validate(dataToUpdate, {
            abortEarly: false,
            stripUnknown: true
        })

        const usersRepository = AppDataSource.getRepository(User)

        await usersRepository.update(reqID, {
            jobLevel: validatedDataToUpdate.jobLevel || foundUser.jobLevel,
            specialty: validatedDataToUpdate.specialty || foundUser.specialty,
            bio: validatedDataToUpdate.bio || foundUser.bio,
            linkedin: validatedDataToUpdate.linkedin || foundUser.linkedin,
            email: validatedDataToUpdate.email || foundUser.email,
            password: validatedDataToUpdate.password || foundUser.password
        })

        const updatedUser = await usersRepository.findOneBy({
            id: reqID
        })

        return updatedUser
    } catch (error) {
        throw new AppError(error, 400)
    }
}