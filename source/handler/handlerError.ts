import { Response } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'HandlerErrors Class';

const httpError = (res: Response, err: any) => {
    logging.error(NAMESPACE, 'Error:' + err);
    res.status(500).send({ error: 'Algo ocurrio ' + err });
};

export { httpError };
