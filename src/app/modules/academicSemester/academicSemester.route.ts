import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodScheme),
  AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
