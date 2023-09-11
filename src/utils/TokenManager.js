import jwt from "jsonwebtoken";
export const generateToken = (uuid) => {
  const expiresIn = 60 * 15;
  try {
    const token = jwt.sign({ uuid }, process.env.JWT_SECRET_KEY, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error.message);
  }
};

export const generateRefreshToken = (uuid, res) => {
  const expiresIn = 60 * 60 * 24;
  try {
    const refleshtoken = jwt.sign({ uuid }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    res.cookie("refleshtoken", refleshtoken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error.message);
  }
};
