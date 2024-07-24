import { Hono } from "hono";
import { db } from "../db";
import { getUserSession } from "../lib/auth";

export const userRoute = new Hono()
  .get("/", async (c) => {
    const session = await getUserSession();
    const user = await db.user.findFirst({ where: { id: session?.id } });
    return c.json(user);
  })
  .put("/", async (c) => {
    const user = await getUserSession();
    const body = await c.req.json();
    const updated = await db.user.update({
      where: { id: user?.id },
      data: body,
    });
    return c.json({
      data: updated,
      msg: "حساب کاربری شما ویرایش شد!",
    });
  })
  .get("/likes", async (c) => {
    const session = await getUserSession();
    const likes = await db.like.findMany({
      where: { userId: session?.id },
      include: { site: true, user: true },
    });

    return c.json(likes);
  })
  .post("/likes", async (c) => {
    const session = await getUserSession();
    const { siteId } = await c.req.json();

    try {
      const existingLike = await db.like.findUnique({
        where: {
          userId_siteId: {
            userId: session?.id!,
            siteId: siteId,
          },
        },
      });

      if (existingLike) {
        // If the like already exists, remove it (unlike)
        await db.like.delete({
          where: { id: existingLike.id },
        });
        return c.json({
          msg: "سایت از لیست علاقه‌مندی‌های شما حذف شد",
          action: "unliked",
        });
      }
      const newLike = await db.like.create({
        data: {
          userId: session?.id!,
          siteId: siteId,
        },
      });
      return c.json({
        data: newLike,
        msg: "سایت به لیست علاقه‌مندی‌های شما اضافه شد",
        action: "liked",
      });
    } catch (error) {
      console.error("Error in like/unlike operation:", error);
      return c.json(
        { error: "An error occurred while processing your request" },
        500
      );
    }
  });
