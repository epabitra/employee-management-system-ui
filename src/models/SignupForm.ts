import { z } from "zod"

export const signupSchema = z
  .object({
    firstName: z.string().min(3, { message: "First name must be at least 3 characters" }),
    lastName: z.string().min(3, { message: "Last name must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    passwordHash: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    langKey: z.string().default("en").optional(),
    mobileNumber: z.string().min(5, { message: "Please enter a valid phone number" }),
    dateOfBirth: z.date({
      required_error: "Please select a date of birth",
    }),
    departmentUuid: z.string(),
    // role: z.string(),
    roleUuid: z.string()
  })
  .refine((data) => data.passwordHash === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Inferred TypeScript type
export type SignupFormValues = z.infer<typeof signupSchema>