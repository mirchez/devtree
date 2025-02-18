import { Router } from "express";
import { createAccount } from "./handlers";
import { body } from "express-validator";
//middleware
const router = Router();

//Authentication and Register
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("Handle cannot be empty"),
  body("name").notEmpty().withMessage("A name is needed"),
  body("email").isEmail().withMessage("Not a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Not valid password, 8 characters is needed"),
  createAccount
);
export default router;

//mongo user: root
//mongo pass: CAXSKAy7rxRowUh8
