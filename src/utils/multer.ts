import multer from 'multer';
import { Request } from 'express';
import allowedMimeTypes from './file-extensions';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const folderPath = req.params.path.split('-').join('/');
            fs.mkdirSync(folderPath, { recursive: true });
            cb(null, folderPath);
        } catch (error) {
            //@ts-ignore
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
) => {
    if (Object.values(allowedMimeTypes).includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                'Invalid file type, only .docx, .pdf, .jpg, .png and .txt are allowed!',
            ),
        );
    }
};

export default multer({ storage, fileFilter });
