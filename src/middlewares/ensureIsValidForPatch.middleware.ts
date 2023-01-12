import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

export const ensureIsValidForPatchMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isAdm = req.user.isAdm
    const id = req.user.id
    const reqID = req.params.id

    if (isAdm || !isAdm && id === reqID) {
        return next()
    } else if (!isAdm && id !== reqID) {
        throw new AppError('User not authorized.', 403)
    }
}