import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index.js';
export const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 * 24 }); // 24 hours
}

export const verifyToken = (token) => {};
