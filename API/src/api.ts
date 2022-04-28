import router from './routes/routes'
import express from 'express'
import cors from 'cors';
import Logger from './infrastructure/logger';

const app = express()

Logger.configure()

app.use(cors())

app.use(express.json({limit: '50mb'}))
app.use(router)

export default app