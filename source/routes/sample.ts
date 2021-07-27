import express from 'express';
import controller from '../controllers/sample';

const router = express.Router();

/**
 * @swagger
 * /sample:
 *   get:
 *      summary: Funcion de ejmplo para rutas
 *      responses:
 *          200:
 *              description: lista de tareas
 *              content:
 *                  application/json:
 *                      schema:
 */
router.get('/ping', controller.sampleHealthCheck);

export default router;
