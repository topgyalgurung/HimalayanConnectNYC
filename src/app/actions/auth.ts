"use server";
import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
  LoginFormState,
} from "@/app/lib/definitions";

// login
// signup
// logout 

import { createSession, deleteSession } from "@/app/lib/session";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { Role } from "@prisma/client";
// cookie should be set on the server to prevent client side tampering

// SIGN UP
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into database
  const { firstName, lastName, email, password } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Only fetch ID for efficiency
    });

    if (existingUser) {
      return {
        message: "An account with this email already exists.",
        status: 400,
      };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with default role
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: Role.USER,
        password: hashedPassword,
      },
      select: { id: true, email: true, role: true },
    });

    if (!newUser?.id) {
      throw new Error("Failed to create user account");
    }

    // Create JWT session
    await createSession(newUser.id, newUser.email, newUser.role);

    // Return success status
    return {
      status: 200,
      message: "Account created successfully",
      redirect: "/profile",
    };
  } catch (error) {
    console.error("Error in signup:", error);
    return {
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while creating your account.",
      status: 500,
    };
  }
}

// login
export async function login(state: LoginFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { email, password } = validatedFields.data;

    // Get user with minimal data needed
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        image: true,
      },
    });

    if (!user?.id) {
      return {
        message: "Invalid email or password",
        status: 401,
      };
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return {
        message: "Invalid email or password",
        status: 401,
      };
    }

    // Create JWT session
    await createSession(user.id, user.email, user.role);

    // Return success status
    return {
      status: 200,
      message: "Logged in successfully",
      redirect: "/",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }, // include user data to avoid re-fetching
    };
  } catch (error) {
    console.error("Error in login:", error);
    return {
      message:
        error instanceof Error
          ? error.message
          : "An error occurred during login.",
      status: 500,
    };
  }
}

// logout
export async function logout() {
  try {
    await deleteSession();
    return {
      status: 200,
      message: "Logged out successfully",
      redirect: "/",
    };
  } catch (error) {
    console.error("Error in logout:", error);
    return {
      status: 500,
      message: "Error during logout",
    };
  }
}
