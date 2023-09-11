// import { Prisma } from "@prisma/client";
import { prismadb } from "../database/db.js";
import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken } from "../utils/TokenManager.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists)
      return res.status(400).json({ message: "ya existe este usuario" });

    await prismadb.user.create({
      data: {
        email,
        password,
      },
    });

    return res.status(201).json({ message: "Register" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Error del servidor" });
  } finally {
    prismadb.$disconnect();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists)
      return res.status(400).json({ message: "no existe este usuario" });

    if (!bcrypt.compareSync(password, userExists.password))
      return res.status(400).json({ message: "contraseña incorrecta" });

    const { token, expiresIn } = generateToken(userExists.id);
    generateRefreshToken(userExists.id, res);

    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};
const infoUser = async (req, res) => {
  const { uid } = req;
  const user = await prismadb.user.findUnique({
    where: {
      id: uid,
    },
    select: {
      id: true,
      email: true,
    },
  });
  if (!user) return res.status(400).json({ message: "no existe este usuario" });
  res.status(200).json({ user });
};

const registerRefresh = async (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
};

const logout = (req, res) => {
  res.clearCookie("refleshtoken");
  res.json({ ok: true });
};

export { login, register, infoUser, registerRefresh, logout };
