import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as tweetController from "../controller/vdtController.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

// 데이터 유효성 검사 규칙 정의
const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 }) // 'text' 필드는 최소 3자 이상이어야 합니다.
    .withMessage("text should be at least 3 characters"), // 검사 실패 시 에러 메시지
  validate, // 데이터 유효성 검사 미들웨어 적용
];

// GET /vdt
// GET /vdt?username=:username
router.get("/", tweetController.getTweets);

// GET /vdt/:id
router.get("/:id", tweetController.getTweet);

// POST /vdt
router.post("/", validateTweet, tweetController.createTweet);

// PUT /vdt/:id
router.put("/:id", validateTweet, tweetController.updateTweet);

// DELETE /vdt/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
