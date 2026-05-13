import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, findUserById } from "#models/users.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in the environment.");
  process.exit(1);
}

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function signup(req, res, next) {
  try {
    const validatedData = signupSchema.parse(req.body);

    const existingUser = await findUserByEmail(validatedData.email);
    if (existingUser) {
      return res
        .status(409)
        .json({ error: { message: "Email is already registered" } });
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    const newUser = await createUser({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      passwordHash,
    });

    res.status(201).json({ data: newUser });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await findUserByEmail(validatedData.email);
    if (!user) {
      return res
        .status(401)
        .json({ error: { message: "Invalid email or password" } });
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: { message: "Invalid email or password" } });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      data: {
        token,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await findUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
}
