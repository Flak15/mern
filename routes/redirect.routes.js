import { Router } from 'express';
import Link from '../models/Link.js';

const router = Router();


router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code });
        if (link) {
            link.clicks++;
            await link.save();
            res.redirect(link.from);
        }
    } catch (e) {
        res.status(400).json({ error: e.message });
        return;
    }
})
export default router;