import { Router } from "express";

import auth from './auth';
import user from './user';
import platillo from './platillo';
import orden from './orden';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/platillos', platillo);
routes.use('/orden', orden);

export default routes;