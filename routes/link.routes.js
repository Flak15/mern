import Router from 'express';
import auth from '../middleware/auth.middleware.js';
import Link from '../models/User.js';
import shortid from 'shortid';
import config from 'config';

const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const { from } = req.body;
    const exist = await Link.findOne({ from });
    if (exist) {
      return res.json({ link: exist });
    }
    const code = shortid.generate();
    const to = config.get('baseUrl') + '/t/' + code;
    const link = new Link({ from, to, code, owner: req.user.userId });
    await link.save();
    res.status(201).json({ link });
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
});

export default router;