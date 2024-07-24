import { Hono } from "hono";
import { db } from "../db";
import { getUserSession } from "../lib/auth";

export const siteRoute = new Hono()
  .get("/search/:q", async (c) => {
    const q = c.req.param("q");
    const sites = await db.site.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            url: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return c.json(sites);
  })
  .get("/", async (c) => {
    const sites = await db.site.findMany({
      include: { user: true },
    });
    return c.json(sites);
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    const session = await getUserSession();
    const site = await db.site.create({
      data: { ...body, userId: session?.id },
    });
    return c.json(site);
  });
