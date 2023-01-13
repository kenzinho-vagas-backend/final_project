import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import AppError from '../errors/AppError'

export const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) =>{

    let token = req.headers.authorization

<<<<<<< HEAD
    if(!token){
        throw new AppError('Invalid Token', 401)
=======
    if (!token) {
        throw new AppError("No token", 401)
        return res.status(401).json({
            message: 'Invalid Token'
        })
>>>>>>> 1e774caed4144aeb3f43f12545073dfbe12265bd
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) =>{
        if(error){
            throw new AppError(error.message, 401)
        }

        req.user = {
            id: decoded.id,
            isAdm: decoded.isAdm 
        }
        
        return next()
    })
}