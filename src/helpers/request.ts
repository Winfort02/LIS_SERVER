import { Hematology, Patient } from "@prisma/client";
import { Request } from "express";

export const PatientRequest = (request: Request) => {
  const {
    last_name,
    first_name,
    middle_name,
    contact_number,
    date_of_birth,
    sex,
    address,
    civil_status,
  } = request.body;

  return {
    last_name,
    first_name,
    middle_name,
    contact_number,
    date_of_birth: new Date(date_of_birth),
    sex,
    address,
    civil_status,
  } as Patient;
};

export const HematologyRequest = (request: Request) => {
  const {
    patient_id,
    physician,
    lab_no,
    hemoglobin,
    hematocrit,
    rbc_count,
    wbc_count,
    platelet_count,
    neutrophil,
    segmented,
    stab,
    lymphocyties,
    monocyties,
    eosinophils,
    basophils,
    remarks,
  } = request.body;
  return {
    patient_id,
    physician,
    lab_no,
    hemoglobin,
    hematocrit,
    rbc_count,
    wbc_count,
    platelet_count,
    neutrophil,
    segmented,
    stab,
    lymphocyties,
    monocyties,
    eosinophils,
    basophils,
    remarks,
  };
};
