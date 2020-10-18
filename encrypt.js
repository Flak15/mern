import hmacSHA512 from 'crypto-js/hmac-sha512.js';

export default (text) => {
	return hmacSHA512(text, 'key').toString();
};