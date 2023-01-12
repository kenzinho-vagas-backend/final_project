import { Router } from 'express'
import { createUserController, getAllUsersController } from '../../controllers'
import { getUserController } from '../../controllers/users/users.controllers'
import { ensuranceUserIsAdmMiddleware, ensureAuthMiddleware, ensureEmailExistsMiddleware } from '../../middlewares'

const usersRoutes = Router()

usersRoutes.post('', ensureEmailExistsMiddleware, createUserController)
usersRoutes.get('', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, getAllUsersController)
usersRoutes.get('/:id', getUserController)

export default usersRoutes