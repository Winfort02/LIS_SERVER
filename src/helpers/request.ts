import { Hematology, Patient, Urinalysis } from "@prisma/client";
import { Request } from "express";

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
    patient_id: request.body.patient_id,
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
    patient_id: request.body.patient_id,
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
