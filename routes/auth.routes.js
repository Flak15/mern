import Router from 'express';
import User from '../models/User.js';
import encrypt from '../encrypt.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

// api/register
router.post('/register',
	[
		body('email').isEmail(),
		body('password').isLength({ min: 6 }),
	],
	async (req, res) => {
		try {
			const { email, password } = req.body;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
				});
			}
			const candidate = await User.findOne({ email });
			if (candidate) {
				return res.status(400).json({ message: 'User already exist' });
			}
			
			const user = new User({ email, password: encrypt(password) });
			
			await user.save();
			res.status(200).json({ message: 'User created' });
			return;
		} catch (e) {
			res.status(400).json({ error: e.message });
			return;
		}
	}
);

// api/login
router.post('/login',
	[
		body('email').isEmail(),
		body('password').exists(),
	],
	async (req, res) => {
		try {
			const { email, password } = req.body;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
				});
			}
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: 'User does not exist' });
			}

			const isMatch = encrypt(password) === user.password;
			if (!isMatch) {
				return res.status(400).json({ message: 'Incorrect password' });
			}

			const token = jwt.sign(
				{ userId: user.id },
				config.get('secretJwt'),
				{ expiresIn: '1h' }
			);

			res.json( { token, userId: user.id });
		} catch (e) {
			res.status(400).json({ error: e.message });
			return;
		}
});

router.post('/verify',
	async (req, res) => {
		try {
			const { token } = req.body;
			const user = jwt.verify(token, config.get('secretJwt'));
			res.json(user);
		} catch (e) {
			res.status(400).json({ error: e.message });
			return;
		}
	}
);

export default router;
