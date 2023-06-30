import express, { Application } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/modules/user/middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())

// ---> parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ---> Application routes
app.use('/api/v1/users/', UserRoutes)

// ---> testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('server is running...')
//   // throw new ApiError(400, 'Opps! error is here') //--->error
//   next('Opps! Error is here')
// })

// ---> global error handler
app.use(globalErrorHandler)

export default app
