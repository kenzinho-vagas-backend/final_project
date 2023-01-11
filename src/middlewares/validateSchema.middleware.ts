import { AnySchema } from 'yup'
import { Response, Request, NextFunction } from 'express'

export const ensurePatchDataIsValidMiddleware = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isValid = await schema.validate(req.body, {
            abortEarly: true,
            stripUnknown: true
        });
    
        req.body = isValid
        return next()
    } catch (error: any) {
        return res.status(400).json({ errors: error.errors })
    }
}