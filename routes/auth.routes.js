import Router from 'express';
import User from '../models/User.js';
import encrypt from '../encrypt.js';
import { body, validationResult } from 'express-validator';
const router = Router();

router.post('/test', (req, res) => {
	console.log(req.body);
});

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
			console.log(email, password);
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
			console.log(email, password);
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
				return res.status(400).json({ message: 'Invalid password' });
			}
			
		} catch (e) {
			res.status(400).json({ error: e.message });
			return;
		}
	

});

export default router;
