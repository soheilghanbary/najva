import { Hono } from "hono";
import { db } from "../db";
import { getUserSession } from "../lib/auth";

// check user like
function checkLike(postId: string, userId: string) {
  return db.like.findUnique({
    where: { userId_postId: { postId, userId } },
  });
}

export const postRoute = new Hono()
  .get("/", async (c) => {
    const sites = await db.post.findMany({
      include: { user: true, likes: true },
      orderBy: { createdAt: "desc" },
    });
    return c.json(sites);
  })
  .get("/liked", async (c) => {
    const session = await getUserSession();
    const sites = await db.post.findMany({
      where: { likes: { some: { userId: session?.id! } } },
      include: { user: true, likes: true },
      orderBy: { createdAt: "desc" },
    });
    return c.json(sites);
  })
  .get("/user", async (c) => {
    const session = await getUserSession();
    const sites = await db.post.findMany({
      where: { userId: session?.id! },
      include: { user: true, likes: true },
      orderBy: { createdAt: "desc" },
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
  })
  .post("/:id/like", async (c) => {
    const { id } = c.req.param();
    const session = await getUserSession();
    // check user liked
    const liked = await checkLike(id, session?.id!);
    if (liked) {
      // delete like
      await db.like.delete({ where: { id: liked.id } });
      return c.json({ msg: "Unliked" });
    }
    const like = await db.like.create({
      data: { postId: id, userId: session?.id! },
    });
    return c.json(like);
  });
