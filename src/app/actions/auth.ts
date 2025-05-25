"use server";

/**
 * authentication actions for the Himalayan Connect NYC application.
 */
// login
// signup
// logout 

import {
  SignupFormSchema,
  LoginFormSchema,
  SignupFormState,
  LoginFormState,
} from "@/app/lib/forms/definitions";

import { createSession, deleteSession } from "@/app/lib/session";
import bcrypt from "bcryptjs";
import {prisma} from "../lib/prisma";
import { Role } from "@prisma/client";

// cookie should be set on the server to prevent client side tampering

// SIGN UP
export async function signup(state: SignupFormState, formData: FormData) {
    // simulate network delay for this async signup operation
  await new Promise((resolve) => setTimeout(resolve, 500));
  const email = formData.get("email") as string;
  
  // First check if email exists
  try {
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
  } catch (error) {
    console.error("Error checking existing user:", error);
    return {
      message: "An error occurred while checking email availability.",
      status: 500,
    };
  }

  // Then validate all form fields
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
  const { firstName, lastName, password } = validatedFields.data;

  try {
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
      select: { id: true, email: true, firstName:true, role: true },
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
      user: {
        userId: newUser.id.toString(),
        firstName: newUser.firstName,
        email: newUser.email,
        role: newUser.role,
      }, // include user data to avoid re-fetching
      
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
export async function login(prevState: LoginFormState, formData: FormData) {
  // simulate network delay for this async login operation
  await new Promise((resolve) => setTimeout(resolve, 500));

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
        firstName: true,
        password: true,
        role: true,
        image: true,
      },
    });

    if (!user?.id) {
      return {
        message: "Invalid email or user does not exist",
        status: 401,
      };
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return {
        message: "Password is incorrect",
        status: 401,
      };
    }

    // Create JWT session
    await createSession(user.id, user.email, user.role);

    // Return success status
    return {
      status: 200, // or true 
      message: "Logged in successfully",
      redirect: "/profile",
      // return user to setUser 
      user: {
        userId: user.id.toString(),
        firstName: user.firstName,
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
