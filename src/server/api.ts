import { Router } from "express";
import getCurrentDayNamesRequest from "../request/getDayNamesRequest";
import getNewsRequest from "../request/getNewsRequest";

const router = Router();

router.get("/what-day-today", async (_req, res, next) => {
  try {
    const dayNames = await getCurrentDayNamesRequest();

    res.json(dayNames);
  } catch (error) {
    next(error);
  }
});

router.get("/news", async (_req, res, next) => {
  try {
    res.json(await getNewsRequest("index"));
  } catch (error) {
    next(error);
  }
});

export default router;
