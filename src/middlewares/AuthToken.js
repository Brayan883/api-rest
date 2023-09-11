import jwt from "jsonwebtoken";
export const AuthPage = (req, res, next) => { 
  try {
    const token = req.headers?.authorization;
    if (!token || token.split(" ")[0] !== "Bearer" || !token.split(" ")[1]) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    req.uid = decoded?.uuid;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Error No autorizado",
    });
  }
};
