import { Request, Response } from 'express'
import { ISessionRequest } from '../interfaces/session.interface'
import sessionService from '../services/users/sessionService.services'

const sessionController = async (req: Request, res: Response) => {
    const userData: ISessionRequest = req.body
    const userFromDatabase = res.locals.user

    const token = await sessionService(userData, userFromDatabase)
    return res.status(200).json(token)
}

export { sessionController }