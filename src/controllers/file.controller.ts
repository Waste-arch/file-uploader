import { Request, Response, NextFunction } from 'express';
import fileService from '../services/file.service';
import archiver from 'archiver';
import fs from 'fs';

class FileController {
    async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({
                message: 'File successfully uploaded',
                success: true,
            });
        } catch (error) {
            next(error);
        }
    }
    async getFiles(req: Request, res: Response, next: NextFunction) {
        try {
            const dir: string = req.params.dir;

            let files: string[] = [];

            if (dir !== '' || !dir) {
                files = fileService.getAllFiles(dir.split('-').join('/'));
            } else {
                throw Error('Invalid folder');
            }

            res.status(200).json({ files, success: true });
        } catch (error) {
            next(error);
        }
    }
    async getFile(req: Request, res: Response, next: NextFunction) {
        try {
            const id: string = req.params.id;

            const file = fileService.getFile(id);

            if (file === '') {
                res.status(404).json({
                    message: 'No file with the specified ID was found.',
                });
            }

            res.status(200).json({ file, success: true });
        } catch (error) {
            next(error);
        }
    }
    async downloadFile(req: Request, res: Response, next: NextFunction) {
        try {
            const id: string = req.params.id;

            if (id === '') {
                res.status(400).json({ message: 'Invalid ID', success: true });
            }

            const file: string = fileService.getFile(id);

            res.status(200).download(file);
        } catch (error) {
            next(error);
        }
    }
    async downloadFiles(req: Request, res: Response, next: NextFunction) {
        try {
            const ids: string = req.params.ids;
            const files = fileService.getFiles(ids.split('-'));

            res.setHeader('Content-Type', 'application/zip');
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=download.zip',
            );

            const archive = archiver('zip', {
                zlib: { level: 9 },
            });

            archive.pipe(res);

            for (const file of files) {
                archive.append(fs.createReadStream(file), {
                    name: file.split('\\').pop() || file,
                });
            }

            await archive.finalize();
        } catch (error) {
            next(error);
        }
    }
    async deleteFile(req: Request, res: Response, next: NextFunction) {
        try {
            const id: string = req.params.id;

            fileService.deleteFile(id);

            res.status(200).json({
                message: 'File has been successfully deleted',
                success: true,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new FileController();
