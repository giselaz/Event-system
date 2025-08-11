import { z } from 'zod';
export const registerSchema = z.object({
  name: z.string().min(2, "Name is too short").required("Name is required"),
  surname: z.string().min(2, "Surname is too short").required("Surname is required"),
  email: z.string().email("Invalid email").required("Email is required"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters").required("Password is required"), 
});

export const vendorSchema = z.object({
  role: z.enum(["user", "vendor"]).default("user"),
  vendor:  z.coerce.number().min(1, "Please select a vendor"),
});

export const fullFormSchema = registerSchema
  .merge(vendorSchema);
