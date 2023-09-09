import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prismadb = new PrismaClient();

prismadb.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const user = params.args.data;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    params.args.data = user;
  }
  return await next(params);
});

export { prismadb };
