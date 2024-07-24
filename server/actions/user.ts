"use server";

import { db } from "../db";
import { getUserSession } from "../lib/auth";

export const getUser = async () => {
  const session = await getUserSession();
  return await db.user.findFirst({ where: { id: session?.id } });
};
