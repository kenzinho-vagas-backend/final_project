import { Router } from 'express'
import { createUserController, getAllUsersController } from '../../controllers'
import { ensuranceUserIsAdmMiddleware, ensureAuthMiddleware, ensureEmailExistsMiddleware } from '../../middlewares'

const usersRoutes = Router()

usersRoutes.post('', ensureEmailExistsMiddleware, createUserController)
usersRoutes.get('', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, getAllUsersController)

export default usersRoutes