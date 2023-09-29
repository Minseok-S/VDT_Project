import express from "express";
import {} from "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as userController from "../controller/user.js";
import { isAuth } from "../middleware/user.js";

const router = express.Router();

const validateCredential = [
  body("userID")
    .trim()
    .notEmpty()
    .withMessage("username should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    // )
    .withMessage("password should be at least 8 characters"),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("username").notEmpty().withMessage("name is missing"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
  validate,
];

router.post("/signup", validateSignup, userController.signup);

router.post("/login", validateCredential, userController.login);

router.get("/me", isAuth, userController.me);

export default router;
