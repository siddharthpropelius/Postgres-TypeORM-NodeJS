import express from 'express';
import {
  metaData,
  byId,
  addMeta,
  deleteMeta,
} from '../Controllers/metaController';

const router = express.Router();

router.get('/api/meta', metaData);

router.get('/api/meta/by-id', byId);

router.post('/api/meta', addMeta);

router.delete('/api/meta', deleteMeta);

export { router as metaRouter };
