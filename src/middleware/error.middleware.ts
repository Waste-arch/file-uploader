import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export default function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    res.status(500).json({
        //@ts-ignore
        error: err.message,
        success: false,
    });
}
