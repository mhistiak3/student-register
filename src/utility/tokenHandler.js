import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/index.js';
export const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 7 * 24 * 60 * 60 * 1000 }); 
}

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
