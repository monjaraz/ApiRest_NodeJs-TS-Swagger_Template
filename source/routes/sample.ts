import express from 'express';
import { sampleHealthCheck } from '../controllers/sample';
import { checkOrigin } from '../middleware/sample';

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
router.get('/ping', checkOrigin, sampleHealthCheck);
router.get('/');
router.get('/:id');
router.post('/');
router.patch('/:id');
router.delete('/:id');

export = router;
