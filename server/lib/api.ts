import type { AppType } from "@/server";
import { hc } from "hono/client";

export const api = hc<AppType>("/").api;
