//pettition solvers
import User from "../models/User"; //User is where the documents of users are store
import type { Request, Response } from "express";
import { hashPassword } from "../utils/auth";
import slugify from "slugify";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //middlewares errors handler
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
    return;
  }
  //sanitizing user email
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("Emaill already exists");
    res.status(409).json({ error: error.message });
    return;
  }
  //sanitizing user nickname
  const handle = slugify(req.body.handle, "");
  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    const error = new Error("Username already exist");
    res.status(409).json({ error: error.message });
    return;
  }
  //create user document
  const user = new User(req.body);
  //saving nickname
  user.handle = handle;
  //crypting pass
  user.password = await hashPassword(password);
  //save in db
  await user.save();
  //send answer
  res.status(201).send({ msg: "User created" });
};
