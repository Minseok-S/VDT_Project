import express from "express";
import "express-async-errors";
import * as vdtController from "../controller/score.js";
const router = express.Router();

// GET /score/statistics?user_id=:user_id
// 특정 사용자의 점수 통계를 위해 모든 값을 가져옴
router.get("/statistics", vdtController.getPostureScores);

// GET /score/:date
router.get("/:date", vdtController.getPostureScore);

// POST /score
router.post("/", vdtController.createTweet);

export default router;
