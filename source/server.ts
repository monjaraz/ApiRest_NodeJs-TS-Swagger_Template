import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
// import sampleRoutes from './routes/sample';
import cors from 'cors';
import morgan from 'morgan';
/**swagtger */
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './config/swagger';

const NAMESPACE = 'Server';
const app = express();

/** Loggin the request */
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], STATUS - [${res.statusCode}] , IP - [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the request */
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

const specs = swaggerJSDoc(options);

/** Routes */
app.use('/' + config.app.ver, require('./routes'));
app.use('/' + config.app.ver + '/docs', swaggerUi.serve, swaggerUi.setup(specs));

/** Error Handling */
app.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({ message: error.message });
});

/** Create the server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
