import app from './src/api'
import Logger from './src/infrastructure/logger'

const port = 3001

app.listen(port, () => {
  Logger.info(`Example app listening on port ${port}`)
})
