import jwt from "jsonwebtoken";
export const requiereRefreshToken = (req, res, next) => {
  try {
    const { refleshtoken } = req.cookies;
    if (!refleshtoken)
      return res.status(401).json({ message: "No autorizado" });
    const decoded = jwt.verify(refleshtoken, process.env.JWT_REFRESH);
    req.uid = decoded?.uuid;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Error No autorizado",
    });
  }
};
