import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { httpError } from '../handler/handlerError';

const NAMESPACE = 'Sample Controller';

const sampleHealthCheck = (req: Request, res: Response) => {
    try {
        logging.info(NAMESPACE, 'Sample health check route called.');
    } catch (e) {
        httpError(res, e);
    }
    return res.status(200).json({ message: 'pong' });
};

export { sampleHealthCheck };
