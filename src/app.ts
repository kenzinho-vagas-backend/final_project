import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import handleError from './errors/handleError'
import { jobRoutes } from './router'

const app = express()
app.use(express.json())

app.use('/job', jobRoutes)

app.use(handleError)

export default app