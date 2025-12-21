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

interface LoginBody {
  email: string;
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

export async function login(
  req: Request<Record<string, never>, LoginBody>,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  let existingUser;

  try {
    // existingUser = await Users.findOne({ email });
    existingUser = await Users.findOne({ email }).select("+password");
  } catch {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    console.log("No user found with email:", email);
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  if (!password || !existingUser.password) {
    const error = new HttpError(
      "Invalid password or user data, please try again.",
      400
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );

    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
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
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    token,
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    },
    message: "Logged In",
  });
}
