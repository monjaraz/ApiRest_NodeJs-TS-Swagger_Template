import express from 'express';
import { sampleHealthCheck, sampleSignIn } from '../controllers/sample';
// import { checkOrigin } from '../middleware/sample';
import authMidd from '../middleware/auth';
import authCtrl from '../controllers/auth';
// import { createJWT } from '../controllers/tools';

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
router.post('/ping', [authMidd.validJWTNeeded, authMidd.verifyRefreshBodyField, authMidd.validRefreshNeeded, authCtrl.createJWT], sampleHealthCheck);
router.post('/signin', [authCtrl.verifyUserPassword, authCtrl.createJWT], sampleSignIn);
router.get('/');
router.get('/:id');
router.post('/');
router.patch('/:id');
router.delete('/:id');

export = router;
