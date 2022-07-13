import express from 'express';
import homeController from '../controller/homeController';

const router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/test', homeController.getTest);

    return app.use('/', router);
}

export default initWebRoute;

