/**
 * Contains Zod schemas and TypeScript types for form validation
// for auth action forms 
// login, signup
 */

import { z } from 'zod'

export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export const ForgotFormSchema = z.object({
  email:z.string().email({message: "Please enter a valid email."})
})
 

export const SuggestFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{3}-\d{3}-\d{4}$/.test(val),
      "Phone number must be in format: XXX-XXX-XXXX"
    ),
  url: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+\.(com|org|net|edu|gov|io)$/i.test(val),
      "URL must be a valid URL ending with .com, .org, etc."
    ),
});

export type SuggestFormSchema = 
  | {
     errors?: {
        email?: string[]
        password?: string[]
    }
    name: string,
    address: string,
    phone: string,
    url:string,
    }
  | undefined

export type SignupFormState =
  | {
      errors?: {
        firstName?: string[]
        lastName?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
      status?: number
      user?: {
        userId: string
        email: string
        role: string
        firstName?: string
      }
    }
  | undefined

export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
      status?: number
      user?: {
        userId: string
        email: string
        role: string
        firstName?: string
      }
    }
  | undefined

export type ForgotFormState =
  | {
    errors?: {
      email?: string[]
    }
    message?: string
    email:string
  } 
| undefined
