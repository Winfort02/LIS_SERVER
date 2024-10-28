import {
  Apparatus,
  Chemistry,
  Hematology,
  Patient,
  Stock,
  StockExpired,
  StockIn,
  StockOut,
  Test,
  Urinalysis,
} from "@prisma/client";
import { Request } from "express";
import { GenerateTransactionNo } from "../service/test.service.";

export const PatientRequest = (request: Request) => {
  return {
    last_name: request.body.last_name,
    first_name: request.body.first_name,
    middle_name: request.body.middle_name,
    contact_number: request.body.contact_number,
    date_of_birth: new Date(request.body.date_of_birth),
    sex: request.body.sex,
    address: request.body.address,
    civil_status: request.body.civil_status,
  } as Patient;
};

export const HematologyRequest = (request: Request) => {
  return {
    test_id: request.body.test_id,
    physician: request.body.physician,
    lab_no: request.body.lab_no,
    hemoglobin: request.body.hemoglobin,
    hematocrit: request.body.hematocrit,
    rbc_count: request.body.rbc_count,
    wbc_count: request.body.wbc_count,
    platelet_count: request.body.platelet_count,
    mcv: request.body.mcv,
    mch: request.body.mch,
    mchc: request.body.mchc,
    rdw_cv: request.body.rdw_cv,
    mpv: request.body.mpv,
    pdw: request.body.pdw,
    neutrophil: request.body.neutrophil,
    segmented: request.body.segmented,
    stab: request.body.stab,
    lymphocyties: request.body.lymphocyties,
    monocyties: request.body.monocyties,
    eosinophils: request.body.eosinophils,
    basophils: request.body.basophils,
    remarks: request.body.remarks,
  } as Hematology;
};

export const UrinalysisRequest = (request: Request) => {
  return {
    test_id: request.body.test_id,
    physician: request.body.physician,
    lab_no: request.body.lab_no,
    color: request.body.color,
    transparancy: request.body.transparancy,
    ph: request.body.ph,
    spec_gravity: request.body.spec_gravity,
    leukocyte_esterase: request.body.leukocyte_esterase,
    nitrite: request.body.nitrite,
    urobilinogen: request.body.urobilinogen,
    blood: request.body.blood,
    ketones: request.body.ketones,
    bilirubin: request.body.bilirubin,
    glucose: request.body.glucose,
    protein: request.body.protein,
    wbc_count: request.body.wbc_count,
    rbc_count: request.body.rbc_count,
    squamous: request.body.squamous,
    rental_tubular: request.body.rental_tubular,
    transitional: request.body.transitional,
    bacteria: request.body.bacteria,
    yeast: request.body.yeast,
    mucus_thread: request.body.mucus_thread,
    amorphous_urates: request.body.amorphous_urates,
    amorphous_phosphates: request.body.amorphous_phosphates,
    uric_acid: request.body.uric_acid,
    calcium_oxalate: request.body.calcium_oxalate,
    triple_phosphate: request.body.triple_phosphate,
    calcium_carbonate: request.body.calcium_carbonate,
    calcium_phosphate: request.body.calcium_phosphate,
    ammonium_biurate: request.body.ammonium_biurate,
    hyaline: request.body.hyaline,
    fine_granular: request.body.fine_granular,
    coarse_granular: request.body.coarse_granular,
    cast_rbc: request.body.cast_rbc,
    cast_wbc: request.body.cast_wbc,
    cast_waxy: request.body.cast_waxy,
    cast_broad: request.body.cast_broad,
    remarks: request.body.remarks,
  } as Urinalysis;
};

export const TestRequest = async (request: Request) => {
  return {
    patient_id: request.body.patient_id,
    type: request.body.type,
    transaction_number: await GenerateTransactionNo(),
  } as Test;
};

export const ChemistryRequest = (request: Request) => {
  return {
    test_id: request.body.test_id,
    physician: request.body.physician,
    lab_no: request.body.lab_no,
    last_meal_take: request.body.last_meal_take,
    time_taken: request.body.time_taken,
    test_requested: request.body.test_requested,
    fasting_blood_sugar: request.body.fasting_blood_sugar,
    random_blood_sugar: request.body.random_blood_sugar,
    post_prandial: request.body.post_prandial,
    total_cholesterol: request.body.total_cholesterol,
    triglycerides: request.body.triglycerides,
    hdl: request.body.hdl,
    ldl: request.body.ldl,
    uric_acid: request.body.uric_acid,
    creatinine: request.body.creatinine,
    bun: request.body.bun,
    sgpt: request.body.sgpt,
    sgot: request.body.sgot,
    sodium: request.body.sodium,
    potasium: request.body.potasium,
    ionized_calcium: request.body.ionized_calcium,
    magnesium: request.body.magnesium,
    calcium: request.body.calcium,
    remarks: request.body.remarks,
  } as Chemistry;
};

export const PaginationRequest = (request: Request) => {
  const page = parseInt(request.query.page as string) || 1;
  const pageSize = parseInt(request.query.size as string) || 25;
  const keywords = (request.query.keywords as string) || "";
  const offset = (page - 1) * pageSize;
  return { page, pageSize, keywords, offset };
};

export const productRequest = (req: Request) => {
  return {
    apparatus_name: req.body.apparatus_name,
    status: req.body.status,
    unit: req.body.unit,
  } as Apparatus;
};

export const stockInRequest = (req: Request) => {
  const stock = {
    user_id: req.user?.id,
    type: req.body.type,
  };
  return {
    stock: stock as Stock,
    stockIn: (req.body?.stock_in as StockIn[]) || [],
  };
};

export const stockOutRequest = (req: Request) => {
  const stock = {
    user_id: req.user?.id,
    type: req.body.type,
  };

  return {
    stock: stock as Stock,
    stockOut: (req.body?.stock_out as StockOut[]) || [],
  };
};

export const expiredStockRequest = (req: Request) => {
  return {
    user_id: req.user?.id,
    status: true,
    apparatus_id: req.body.apparatus_id,
    quantity: req.body.quantity,
    remarks: req.body.remarks,
  } as StockExpired;
};
