import { Router } from 'express';
import Link from '../models/Link.js';

const router = Router();


router.get('/:code', async (req, res) => {
    console.log('redirect');
    try {
        const link = await Link.findOne({ code: req.params.code });
        if (link) {
            link.clicks++;
            await link.save();
            console.log(link.from);
            res.redirect(link.from);
        }
    } catch (e) {
        res.status(400).json({ error: e.message });
        return;
    }
})
export default router;