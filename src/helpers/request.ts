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
  };
};
