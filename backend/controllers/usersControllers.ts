import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/Users";
import HttpError from "../models/httpError";
import { Request, Response, NextFunction } from "express";

interface SignupBody {
  email: string;
  name: string;
  password: string;
}

export async function signup(
  req: Request<Record<string, never>, SignupBody>,
  res: Response,
  next: NextFunction
) {
  const { email, name, password } = req.body;

  let existingUser;

  try {
    existingUser = await Users.findOne({ email });
  } catch {
    const error = new HttpError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exists, please login instead",
      422
    );
    return next(error);
  }

  const role = email.endsWith("@admin.com") ? "admin" : "user";

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch {
    const error = new HttpError(
      "Could not create user right now, please try again later",
      500
    );
    return next(error);
  }

  const createdUser = new Users({
    name,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await createdUser.save();
  } catch {
    const error = new HttpError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  let token;
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    token,
    user: {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    },
    message: "User Created",
  });
}
