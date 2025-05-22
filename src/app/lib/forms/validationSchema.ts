import { z } from "zod";

export const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name cannot contain numbers or special characters"),
  categoryId: z.string().min(1, "Please select a category"),
  address: z.string()
    .min(5, "Address must be at least 5 characters")
    .refine(
      (address) => {
        const parts = address.split(',').map(part => part.trim());
        if (parts.length < 3) return false;
        
        const [street, city, stateZip] = parts;
        const cityRegex = /^[a-zA-Z\s]+$/;
        const stateRegex = /^[a-zA-Z]{2}$/;
        const zipRegex = /^\d{5}(-\d{4})?$/; // Validates ZIP codes in formats: 12345 or 12345-6789
        
        // Split state and zip if present
        const [state, zip] = stateZip.split(' ').map(part => part.trim());
        
        // Check required fields
        const requiredFieldsValid = 
          street.length >= 5 &&
          city.length >= 2 &&
          cityRegex.test(city) &&
          stateRegex.test(state);

        // If zip is provided, validate it
        if (zip) {
          return requiredFieldsValid && zipRegex.test(zip);
        }

        // If no zip provided, just check required fields
        return requiredFieldsValid;
      },
      "Address must include street, city, and state in format: Street, City, State ZIP"
    ),
  phone: z.string()
    .regex(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in format: XXX-XXX-XXXX")
    .optional()
    .or(z.literal("")),
  url: z
    .string()
    .trim()
    .refine(
      (url) => {
        if (!url) return true;
        const urlRegex = /^(www?:\.)?(https?:\/\/)?[^\s\/]+\.[a-z]{2,}([\/?#].*)?$/i;
        return urlRegex.test(url);
      },
      {
        message: "Please enter a valid URL (e.g., example.com or https://example.com)",
      }
    )
    .optional()
    .or(z.literal("")),
  facebookLink: z.string()
    .refine(
      (url) => url === "" || url.includes("facebook.com"),
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