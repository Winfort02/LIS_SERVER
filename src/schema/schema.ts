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
  test_id: z.number(),
  physician: z.string(),
  lab_no: z.string(),
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

export const urinalysisSchema = z.object({
  test_id: z.number(),
  physician: z.string(),
  lab_no: z.string(),
  ph: z.number().multipleOf(0.01),
  spec_gravity: z.number().multipleOf(0.001),
  wbc_count: z.string(),
  rbc_count: z.string(),
  cast_rbc: z.string(),
  cast_wbc: z.string(),
});

export const testSchema = z.object({
  patient_id: z.number(),
  type: z.string(),
});

export const ChemistrySchema = z.object({
  test_id: z.number(),
  physician: z.string(),
  lab_no: z.string(),
  test_requested: z.string(),
  fasting_blood_sugar: z.number().multipleOf(0.01).nullable(),
  random_blood_sugar: z.number().multipleOf(0.01).nullable(),
  post_prandial: z.number().multipleOf(0.01).nullable(),
  total_cholesterol: z.number().multipleOf(0.01).nullable(),
  triglycerides: z.number().multipleOf(0.01).nullable(),
  hdl: z.number().multipleOf(0.01).nullable(),
  ldl: z.number().multipleOf(0.01).nullable(),
  uric_acid: z.number().multipleOf(0.01).nullable(),
  creatinine: z.number().multipleOf(0.01).nullable(),
  bun: z.number().multipleOf(0.01).nullable(),
  sgpt: z.number().multipleOf(0.01).nullable(),
  sgot: z.number().multipleOf(0.01).nullable(),
  sodium: z.number().multipleOf(0.01).nullable(),
  potasium: z.number().multipleOf(0.01).nullable(),
  ionized_calcium: z.number().multipleOf(0.01).nullable(),
  magnesium: z.number().multipleOf(0.01).nullable(),
  calcium: z.number().multipleOf(0.01).nullable(),
  remarks: z.string(),
});

export const ApparatusSchema = z.object({
  apparatus_name: z.string(),
  unit: z.string(),
  status: z.boolean(),
});
