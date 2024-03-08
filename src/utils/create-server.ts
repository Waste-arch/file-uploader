import express from 'express';
import fileRouter from '../routes/file.route';
import errorHandler from '../middleware/error.middleware';

export default () => {
    const app = express();

    app.use(fileRouter);

    app.use(errorHandler);

    return app;
};
