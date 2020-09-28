import { Router } from "express";
import getCurrentDayNamesRequest from "./request/getCurrentDayNamesRequest";

const router = Router();

router.get("/what-day-today", async (_req, res, next) => {
  try {
    const dayNames = await getCurrentDayNamesRequest();

    res.json(dayNames);
  } catch (error) {
    next({
      message: "Что-то не так, попробуй еще раз 🤯",
    });
  }
});

export default router;
