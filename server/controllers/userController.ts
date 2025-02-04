import { Request, Response } from "express";
import { RequestWithUser } from "../types/user";
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log("Please include all fields");
      res.status(400);
      throw new Error("Please include all fields");
    }

    // Find if user already exixts
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

// @desc Login user
// @route /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc Get Current User
// @route /api/users/me
// @access Private
export const getMe = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const user = {
      id: req.user?.id,
      email: req.user?.email,
      name: req.user?.name,
    };

    res.status(200).json(user);
  }
);

// Generate Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};
