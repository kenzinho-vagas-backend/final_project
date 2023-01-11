import { Router } from 'express'
import { createUserController } from '../../controllers/createUserController.controllers'
import ensureUserExists from '../../middlewares/ensureUserExists.middleware'

const usersRoutes = Router()

usersRoutes.post('', ensureUserExists, createUserController)

export default usersRoutes