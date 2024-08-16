import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const patientSchema = z.object({
  last_name: z.string(),
  first_name: z.string(),
  middle_name: z.string(),
  contact_number: z.string(),
  date_of_birth: z.string().transform((str) => new Date(str).toISOString()),
  sex: z.string(),
  address: z.string(),
  civil_status: z.string(),
});
