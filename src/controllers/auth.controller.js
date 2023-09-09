// import { Prisma } from "@prisma/client";
import { prismadb } from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign(
      {
        uid: userExists.id,
      },
      process.env.JWT_SECRET_KEY
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export { login, register };
