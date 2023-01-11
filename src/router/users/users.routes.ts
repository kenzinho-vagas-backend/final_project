import { Router } from 'express'
import { createUserController } from '../../controllers'
import { ensureEmailExists } from '../../middlewares'

const usersRoutes = Router()

usersRoutes.post('', ensureEmailExists, createUserController)

export default usersRoutes