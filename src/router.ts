import { Router } from "express";
import { createAccount, login } from "./handlers";
import { body } from "express-validator";
import { handleInputErrors } from "./middlewares/validation";
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
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("Not valid email"),
  body("password").notEmpty().withMessage("Not valid password"),
  handleInputErrors,
  login
);
export default router;
