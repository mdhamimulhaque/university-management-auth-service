import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/modules/middlewares/globalErrorHandler';

const app: Application = express();

app.use(cors());

// ---> parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---> Application routes
app.use('/api/v1/users/', UserRoutes);

// ---> testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Unhandled Promise Rejection'))
//   // next('Opps! Error is here')
// })

// ---> global error handler
app.use(globalErrorHandler);

export default app;
