"use server";

import {
  SignupFormSchema,
  LoginFormSchema,
  SignupFormState,
  LoginFormState,
  ForgotFormState,
  ForgotFormSchema,
  ResetPasswordFormSchema,
  ResetPasswordFormState,
} from "@/app/lib/forms/definitions";

import { createSession, deleteSession } from "@/app/lib/session";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { headers } from "next/headers";
import { after } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Role } from "@prisma/client";
import { sendEmail } from "@/app/lib/helpers/mailer";
import { checkRateLimit, getClientIp } from "@/app/lib/rate-limit";

async function getRequestIp() {
  const headersList = await headers();
  return getClientIp(headersList);
}

// cookie should be set on the server to prevent client side tampering

// SIGN UP
export async function signup(state: SignupFormState, formData: FormData) {
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
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (existingUser) {
      return {
        message: existingUser.password
          ? "An account with this email already exists."
          : "This email is already linked to Google sign-in. Please use the 'Sign up with Google' button.",
        status: 400,
      };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Avoid Prisma create here because the live DB schema can lag behind
    // the Prisma model in some environments.
    await prisma.$executeRaw`
      INSERT INTO "User" ("firstName", "lastName", "email", "password", "role", "createdAt", "updatedAt")
      VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, ${Role.USER}::"Role", NOW(), NOW())
    `;

    const newUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, firstName: true, role: true },
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
    const rateLimited = await checkRateLimit(await getRequestIp());
    if (rateLimited) {
      return { message: "Too many attempts. Please try again shortly.", status: 429 };
    }

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

    // Check if user signed up via OAuth only (no password set)
    if (user && !user.password) {
      return {
        message: "This account uses Google sign-in. Please use the 'Sign in with Google' button.",
        status: 401,
      };
    }

    // Verify password. Compare against a dummy hash when the user doesn't
    // exist so response timing doesn't reveal account existence, and use one
    // generic message for both "no such account" and "wrong password".
    const validPassword = await bcrypt.compare(
      password,
      user?.password ?? "$2b$10$SivJBKGRRn1C27z9MOyLzuz1IOP.HW4EU.ggVVN/DOZ7FgsK1TYIe"
    );
    if (!user?.id || !validPassword) {
      return {
        message: "Invalid email or password",
        status: 401,
      };
    }

    // Create JWT session, create session has JWT expiration 
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


// forgot password 
export async function forgotPassword(prevState: ForgotFormState, formData: FormData) {

  // validate form fields
  const validateFields = ForgotFormSchema.safeParse({
    email: formData.get("email")
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: undefined,
      email: undefined,
      success: undefined,
      status: undefined,
    };
  }

  try {
    const rateLimited = await checkRateLimit(await getRequestIp());
    if (rateLimited) {
      return {
        message: "Too many attempts. Please try again shortly.",
        status: 429,
        errors: undefined,
        email: undefined,
        success: undefined,
      };
    }

    const { email } = validateFields.data;

    // Look up only the id - never return the full user record, which
    // would include the password hash and reset/verify tokens.
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    // Send after the response goes out (rather than awaiting here) so a real
    // account and a nonexistent one take the same time to respond - otherwise
    // the email round-trip would leak account existence via timing.
    if (user) {
      after(() =>
        sendEmail({ email, emailType: "RESET", userId: user.id }).catch((err) => {
          console.error("Failed to send reset email:", err);
        })
      );
    }

    // Respond identically whether or not the account exists, so this
    // endpoint can't be used to enumerate registered emails.
    return {
      message: "If an account with that email exists, you'll receive a password reset link shortly.",
      success: true,
      errors: undefined,
      email: undefined,
      status: undefined,
    }


  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "An error occured",
      status: 500,
      errors: undefined,
      email: undefined,
      success: undefined,
    }

  }
}

// reset password
export async function resetPassword(prevState: ResetPasswordFormState, formData: FormData) {
  const token = formData.get("token") as string;

  // validate form fields
  const validateFields = ResetPasswordFormSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { password, confirmPassword } = validateFields.data;

    if (password !== confirmPassword) {
      return {
        message: "Passwords do not match",
        status: 400,
      };
    }

    if (!token || typeof token !== "string") {
      return {
        message: "Invalid or expired token",
        status: 400,
      };
    }

    // The DB only stores a SHA-256 hash of the token, so hash the incoming
    // raw token before looking it up.
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return {
        message: "Invalid or expired token",
        status: 400,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword,
        forgotPasswordToken: null,
        forgotPasswordTokenExpiry: null
      }
    })

    return {
      message: "Password reset successfully",
      success: true,
      status: 200
    }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
      status: 500,
    }
  }
}
