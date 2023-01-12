import { Router } from 'express'
import { createUserController, getAllUsersController, getUserController, deleteUserController, updateUserController } from '../../controllers'
import { ensuranceUserIsAdmMiddleware, ensureAuthMiddleware, ensureEmailExistsMiddleware, ensureIDExistsMiddleware, ensureIsValidForPatchMiddleware } from '../../middlewares'

const usersRoutes = Router()

usersRoutes.post('', ensureEmailExistsMiddleware, createUserController)
usersRoutes.get('', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, getAllUsersController)
usersRoutes.get('/:id', ensureIDExistsMiddleware, getUserController)
usersRoutes.delete('/:id', ensureAuthMiddleware, ensuranceUserIsAdmMiddleware, ensureIDExistsMiddleware, deleteUserController)
usersRoutes.patch('/:id', ensureIDExistsMiddleware, ensureAuthMiddleware, ensureIsValidForPatchMiddleware, updateUserController)

export default usersRoutes