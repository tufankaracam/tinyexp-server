import { Router } from "express";
import CategoryRouter from './categories.route';
import SubCategoryRouter from './subcategories.route';
import TrackingTypeRouter from './trackingtypes.route';
import ActivityRouter from './activities.route';
import ActivityLogsRouter from './activitylogs.route';
import AuthRouter from './auth.route';
import HealthCheckRouter from './healthcheck.route';

const router = Router();

router.use('/categories',CategoryRouter);
router.use('/subcategories',SubCategoryRouter);
router.use('/trackingtypes',TrackingTypeRouter);
router.use('/activities',ActivityRouter);
router.use('/activitylogs',ActivityLogsRouter);
router.use('/auth',AuthRouter);
router.use('/healthcheck',HealthCheckRouter);

export default router;