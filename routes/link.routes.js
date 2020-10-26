import Router from 'express';
import Link from '../models/User.js';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
});

router.get('/', async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
});

router.get('/:id', async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
});

export default router;