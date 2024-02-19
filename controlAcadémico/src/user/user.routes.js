'use strict'

import { Router } from 'express'
import { validateJwt, isTeacher } from '../middlewares/validate-jws.js'
import { login, register, test } from './user.controller.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)

api.get('/test', [validateJwt, isTeacher], test)

export default api