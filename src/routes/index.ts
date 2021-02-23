import { Router } from 'express';

import CarsController from '../controllers/CarsController';

const routes = Router();

routes.post('/cars', CarsController.create);
routes.get('/cars/:id', CarsController.read);
routes.put('/cars/:id', CarsController.update);
routes.delete('/cars/:id', CarsController.delete);
routes.get('/cars', CarsController.index);

export default routes;