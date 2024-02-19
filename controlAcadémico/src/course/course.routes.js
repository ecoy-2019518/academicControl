import express from 'express'
import { save, testC } from './course.controller.js'

const api = express.Router();

api.get('/testC', testC)
api.post('/save', save)

export default api