import { compare } from 'bcryptjs'
import { User } from '../../entities/users.entity'
import { ISessionRequest } from '../../interfaces/session.interface'
import { sessionSchema } from '../../schemas/session.schemas'
import AppError from '../../errors/AppError'
import jwt from 'jsonwebtoken'

const sessionService = async (userData: ISessionRequest, userFromDatabase: User) => {
    try {
        const userDataValidated = await sessionSchema.validate(userData, {
            abortEarly: false,
            stripUnknown: true
        })

        const passwordMatch = await compare(userDataValidated.password, userFromDatabase.password)

        if (!passwordMatch) {
            throw new AppError('User invalid', 403)
        }

        const token = jwt.sign(
            {
                isAdm: userFromDatabase.isAdm,
                id: userFromDatabase.id
            },
            process.env.SECRET_KEY,
            {
                subject: userFromDatabase.id,
                expiresIn: '24h'
            }
        )

        return { token: token }
    } catch (error) {
        throw new AppError('User invalid', 403)
    }
}

export default sessionService