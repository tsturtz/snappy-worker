import { Router } from "express";
import getCurrentDayNamesRequest from "./request/getCurrentDayNamesRequest";
import getNewsRequest from "./request/getNewsRequest";

const router = Router();

router.get("/what-day-today", async (_req, res, next) => {
  try {
    const dayNames = await getCurrentDayNamesRequest();

    res.json(dayNames);
  } catch (error) {
    next({
      error,
      message: "Что-то не так, попробуй еще раз 🤯",
    });
  }
});

router.get("/news", async (_req, res, next) => {
  try {
    res.json(await getNewsRequest("index"));
  } catch (error) {
    next({
      error,
      message: "Что-то не так, попробуй еще раз 🤯",
    });
  }
});

export default router;
