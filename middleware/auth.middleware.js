import config from 'config';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    if (req.method === 'OPTIONS') { // is it nessesary?
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization error1' });
        }
        const user = jwt.verify(token, config.get('secretJwt'));
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ message: JSON.stringify(e) });
    }

}