import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (2+ characters).")
    .max(80, "Name too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(120, "Email too long."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject is too short.")
    .max(140, "Subject too long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so I can reply meaningfully.")
    .max(4000, "Message too long (4000 character max)."),
  // Honeypot - must remain empty. Bots will fill it.
  website: z.string().max(0).optional().default("")
});

export type ContactInput = z.infer<typeof contactSchema>;
