import { Router } from "express";
import getCurrentDayNamesRequest from "../request/getCurrentDayNamesRequest";

const router = Router();

router.get("/what-day-today", async (_req, res) => {
  try {
    const dayNames = await getCurrentDayNamesRequest();

    res.json(dayNames);
  } catch (error) {
    res.status(400).json({
      message: "Что-то не так, попробуй еще раз 🤯",
    });
  }
});

export default router;
