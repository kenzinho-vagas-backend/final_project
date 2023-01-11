import { Router } from 'express'
import { createUserController } from '../../controllers'
import { ensureUserExists } from '../../middlewares'

const usersRoutes = Router()

usersRoutes.post('', ensureUserExists, createUserController)

export default usersRoutes