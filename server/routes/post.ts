import { Hono } from "hono";
import { db } from "../db";
import { getUserSession } from "../lib/auth";

export const postRoute = new Hono()
  .get("/search/:q", async (c) => {
    const q = c.req.param("q");
    const sites = await db.post.findMany({
      where: {
        OR: [
          {
            content: {
              contains: q,
              // mode: "insensitive",
            },
          },
        ],
      },
    });
    return c.json(sites);
  })
  .get("/", async (c) => {
    const sites = await db.post.findMany({
      include: { user: true },
    });
    return c.json(sites);
  })
  .post("/", async (c) => {
    const { content } = (await c.req.json()) as { content: string };
    const session = await getUserSession();
    const site = await db.post.create({
      data: { content, userId: session?.id! },
    });
    return c.json(site);
  });
