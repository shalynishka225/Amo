import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { Application } from 'express';

import AuthRoutes from './modules/auth/auth.routes';

const applyMiddlewares = (app) => {
  app.use(compression());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
};

export const registerRestEndpoints = (app) => {
  applyMiddlewares(app);

  app.use('/auth', AuthRoutes);
};
