import { Router } from 'express';
import FileController from '../controllers/file.controller';
import upload from '../utils/multer';

const fileRouter = Router();

fileRouter.post(
    '/upload/:path',
    upload.fields([
        { name: 'file', maxCount: 1 },
        { name: 'files', maxCount: 10 },
    ]),
    FileController.uploadFile,
);
fileRouter.get('/files/:dir', FileController.getFiles);
fileRouter.get('/file/:id', FileController.getFile);
fileRouter.post('/file/download/:id', FileController.downloadFile);
fileRouter.post('/files/download/:ids', FileController.downloadFiles);
fileRouter.post('/delete/:id', FileController.deleteFile);

export default fileRouter;
