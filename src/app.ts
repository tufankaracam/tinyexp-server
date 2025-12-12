import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { rateLimit } from 'express-rate-limit';
import notFoundMiddleware from './middlewares/notfound.middleware';
import errorHandlerMiddleware from './middlewares/errorhandler.middleware';
import healthCheckMiddleware from './middlewares/errorhandler.middleware';
import accessLogger from './middlewares/accesslogger.middleware';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
})

const app = express();
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(compression());
app.use(accessLogger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    persistAuthorization: true,
  }
}));

app.use('/api/v1/', routes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;