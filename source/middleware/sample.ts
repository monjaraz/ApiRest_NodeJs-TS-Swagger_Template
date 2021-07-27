import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample Middleware';
const checkOrigin = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Sample middleware called.');
    console.log(req.headers);
    const tokenUser = req.headers.authorization?.split(' ').pop();
    if (tokenUser === '123456') {
        next();
    } else {
        res.status(409).send({ error: 'Tu por aqui no pasas' });
    }
};

export { checkOrigin };
