import express from 'express';
import fs from 'fs';

const router = express.Router();

const pathRouter = `${__dirname}`;

const removeExtension = (fileName: string) => {
    return fileName.split('.').shift();
};

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt!);
    if (!skip) {
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
    }
});

router.get('*', (req, res) => {
    res.status(404).send({ error: 'No se encontro ruta' });
});

export = router;
