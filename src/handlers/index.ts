//pettition solvers
import User from "../models/User"; //User is where the documents of users are store
import type { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import slugify from "slugify";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //middleware handler
  const user = await User.findOne({ email });
  //checks if the email exists
  if (!user) {
    const error = new Error("user does not exits");
    res.status(404).json({ error: error.message });
    return;
  }
  //check password
  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Incorrect Password");
    res.status(401).json({ error: error.message });
    return;
  }

  res.send("Authenticated");
};
