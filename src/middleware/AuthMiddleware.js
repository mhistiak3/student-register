import { verifyToken } from "../utility/tokenHandler.js";

const AuthMiddleware = (req, res, next) => {
  try {
    const decode = verifyToken(req.cookies.token);

    if (!decode) {
      return res.status(401).json({
        type: "Fail",
        message: "Unauthorized",
      });
    }
    req.headers.email = decode.email;
    req.headers.studentId = decode.studentId;
    next();
  } catch (error) {
    return res.status(401).json({
      type: "Fail",
      message: "Token not valid",
    });
  }
};
export default AuthMiddleware;
