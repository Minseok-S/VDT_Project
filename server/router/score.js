import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/score.js";

const router = express.Router();

// GET /score/:id
router.get("/:id", tweetController.getScores);

// POST /score
router.post("/", tweetController.createScore);

// 사용할지 안할지 미지수
// PUT /score/:id
router.put("/:id", tweetController.updateScore);

export default router;
