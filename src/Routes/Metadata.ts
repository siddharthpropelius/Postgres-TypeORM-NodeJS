import express from 'express';
import {
  metaData,
  byId,
  addMeta,
  deleteMeta,
} from '../Controllers/metaController';
import authenticateToken from '../Middleware/authenticateToken';

const router = express.Router();

router.get('/api/meta', authenticateToken, metaData);

router.get('/api/meta/by-id', authenticateToken, byId);

router.post('/api/meta', authenticateToken, addMeta);

router.delete('/api/meta', authenticateToken, deleteMeta);

export { router as metaRouter };
