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

export const hemotologySchema = z.object({
  patient_id: z.number(),
  physician: z.string(),
  lab_no: z.number().multipleOf(0.01),
  hemoglobin: z.number().multipleOf(0.01),
  hematocrit: z.number().multipleOf(0.01),
  rbc_count: z.number().multipleOf(0.01),
  wbc_count: z.number().multipleOf(0.01),
  platelet_count: z.number().multipleOf(0.01),
  neutrophil: z.number().multipleOf(0.01),
  segmented: z.number().multipleOf(0.01),
  stab: z.number().multipleOf(0.01),
  lymphocyties: z.number().multipleOf(0.01),
  monocyties: z.number().multipleOf(0.01),
  eosinophils: z.number().multipleOf(0.01),
  basophils: z.number().multipleOf(0.01),
  remarks: z.string(),
});
