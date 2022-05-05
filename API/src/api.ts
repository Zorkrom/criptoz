import router from './routes/routes'
import express from 'express'
import cors from 'cors';
import Logger from './infrastructure/logger';
import AuthRouter from './routes/auth';
import CoinRouter from './routes/coin';

const app = express()

Logger.configure()

app.use(cors())

app.use(express.json({limit: '50mb'}))
app.use(router)
app.use('/login', AuthRouter)
app.use('/coin',CoinRouter)

export default app