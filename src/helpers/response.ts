import {
  $Enums,
  Chemistry,
  Hematology,
  Patient,
  Urinalysis,
  User,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class SuccessReponse {
  data!: any;
  statusCode!: number;
  success!: boolean;

  constructor(data: any, statuCode: number, success: boolean) {
    this.data = data;
    this.statusCode = statuCode;
    this.success = success;
  }
}

export class ErrorResponse {
  errors: any;
  success!: boolean;
  message: string = "";
  constructor(errors: any, success: boolean, message: string) {
    this.errors = errors;
    this.success = success;
    this.message = message;
  }
}

export class UserResponse {
  id!: number;
  name!: string;
  email!: string;
  role!: $Enums.Role;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export class Mapper {
  hemotologyResponse(hematologoy: Hematology[]) {
    return hematologoy.map((item: Hematology) => ({
      ...item,
      basophils: item.basophils.toNumber(),
      hemoglobin: item.hemoglobin.toNumber(),
      hematocrit: item.hematocrit.toNumber(),
      rbc_count: item.rbc_count.toNumber(),
      wbc_count: item.wbc_count.toNumber(),
      platelet_count: item.platelet_count.toNumber(),
      neutrophil: item.neutrophil.toNumber(),
      segmented: item.segmented.toNumber(),
      stab: item.stab.toNumber(),
      lymphocyties: item.lymphocyties.toNumber(),
      monocyties: item.monocyties.toNumber(),
      eosinophils: item.eosinophils.toNumber(),
    }));
  }

  urinalysisResponse(hematologoy: Urinalysis[]) {
    return hematologoy.map((item: Urinalysis) => ({
      ...item,
      ph: item.ph.toNumber(),
      spec_gravity: item.spec_gravity.toNumber(),
      wbc_count: item.wbc_count.toNumber(),
      rbc_count: item.rbc_count.toNumber(),
      cast_rbc: item.cast_rbc?.toNumber(),
      cast_wbc: item.cast_wbc?.toNumber(),
    }));
  }

  SingleHematologyResponse(response: Hematology) {
    if (!response) return null;
    return {
      ...response,
      basophils: response.basophils.toNumber(),
      hemoglobin: response.hemoglobin.toNumber(),
      hematocrit: response.hematocrit.toNumber(),
      rbc_count: response.rbc_count.toNumber(),
      wbc_count: response.wbc_count.toNumber(),
      platelet_count: response.platelet_count.toNumber(),
      neutrophil: response.neutrophil.toNumber(),
      segmented: response.segmented.toNumber(),
      stab: response.stab.toNumber(),
      lymphocyties: response.lymphocyties.toNumber(),
      monocyties: response.monocyties.toNumber(),
      eosinophils: response.eosinophils.toNumber(),
      mcv: response.mcv.toNumber(),
      mch: response.mch.toNumber(),
      mchc: response.mchc.toNumber(),
      rdw_cv: response.rdw_cv.toNumber(),
      mpv: response.mpv.toNumber(),
      pdw: response.pdw.toNumber(),
    };
  }

  SingleUrinalysisResponse(response: Urinalysis) {
    if (!response) return null;
    return {
      ...response,
      ph: response.ph.toNumber(),
      spec_gravity: response.spec_gravity.toNumber(),
      wbc_count: response.wbc_count.toNumber(),
      rbc_count: response.rbc_count.toNumber(),
      cast_rbc: response.cast_rbc?.toNumber(),
      cast_wbc: response.cast_wbc?.toNumber(),
    };
  }

  SingleChemistryResponse(response: Chemistry) {
    if (!response) return null;
    return {
      ...response,
      fasting_blood_sugar: response.fasting_blood_sugar?.toNumber() || null,
      random_blood_sugar: response.random_blood_sugar?.toNumber() || null,
      post_prandial: response.post_prandial?.toNumber() || null,
      total_cholesterol: response.total_cholesterol?.toNumber() || null,
      triglycerides: response.triglycerides?.toNumber() || null,
      hdl: response.hdl?.toNumber() || null,
      ldl: response.ldl?.toNumber() || null,
      uric_acid: response.uric_acid?.toNumber() || null,
      creatinine: response.creatinine?.toNumber() || null,
      bun: response.bun?.toNumber() || null,
      sgpt: response.sgpt?.toNumber() || null,
      sgot: response.sgot?.toNumber() || null,
      sodium: response.sodium?.toNumber() || null,
      potasium: response.potasium?.toNumber() || null,
      ionized_calcium: response.ionized_calcium?.toNumber() || null,
      magnesium: response.magnesium?.toNumber() || null,
      calcium: response.calcium?.toNumber() || null,
    };
  }
}
