import { z } from "zod";

export const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name cannot contain numbers or special characters"),
  categoryId: z.string().min(1, "Please select a category"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string()
    .regex(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in format: XXX-XXX-XXXX")
    .optional()
    .or(z.literal("")),
  url: z.string()
    .url("Must be a valid URL")
    .refine(
      (url) => /\.(com|org|net|edu|gov|io)$/i.test(url),
      "URL must end with a valid domain extension (.com, .org, etc.)"
    )
    .optional()
    .or(z.literal("")),
  facebookLink: z.string()
    .refine(
      (url) => url === "" || url.includes("facebook.com/"),
      "Facebook link must be a valid Facebook URL"
    )
    .optional()
    .or(z.literal("")),
  description: z.string()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

export type FormValues = z.infer<typeof formSchema>; 