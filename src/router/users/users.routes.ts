import { Router } from 'express'
import { createUserController, deleteUserController, getAllUsersController, getUserController } from '../../controllers/users/users.controllers'
import { ensuranceUserIsAdmMiddleware, ensureAuthMiddleware, ensureEmailExistsMiddleware, ensureIDExistsMiddleware } from '../../middlewares'

const usersRoutes = Router()

usersRoutes.post('', ensureEmailExistsMiddleware, createUserController)
usersRoutes.get('', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, getAllUsersController)
usersRoutes.get('/:id', ensureIDExistsMiddleware, getUserController)
usersRoutes.delete('/:id', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensureIDExistsMiddleware, deleteUserController)

export default usersRoutes