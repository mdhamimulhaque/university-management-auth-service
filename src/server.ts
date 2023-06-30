import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

// ---> uncaught exception error handle
process.on('uncaughtException', err => {
  console.log('uncaught exception is detected....', err)
  process.exit(1)
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connected successfully')

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    console.log('rejected...........')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

// ---> sigterm
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
