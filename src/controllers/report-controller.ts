import { Response, Request } from "express";
import puppeteer from "puppeteer";
import hbs from "handlebars";
import * as fs from "fs-extra";
import path from "path";
import moment from "moment";
import { prismaClient } from "..";
import { NotFound } from "../exceptions/request";
import { HematologyErrorMessage } from "../helpers/error-messages";
import { ErrorCode } from "../exceptions/generic";
import { Hematology } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const compiler = async (template: any, data: any) => {
  const filePath = path.join(process.cwd(), "/src/template", `${template}.hbs`);
  const html = await fs.readFile(filePath, "utf-8");
  return hbs.compile(html)(data);
};

hbs.registerHelper("dateFormat", (value: Date, format: string) => {
  return moment(value).format(format);
});

hbs.registerHelper("total", (hematology: Hematology) => {
  const getValue = (value: Decimal) => value.toNumber() || 0;
  const {
    neutrophil,
    segmented,
    stab,
    lymphocyties,
    monocyties,
    eosinophils,
    basophils,
  } = hematology;

  return (
    getValue(neutrophil) +
    getValue(segmented) +
    getValue(stab) +
    getValue(lymphocyties) +
    getValue(monocyties) +
    getValue(eosinophils) +
    getValue(basophils)
  );
});

export const GenerateHematologyPDF = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const hematology = await prismaClient.hematology.findUnique({
    where: { id },
    include: {
      patient: true,
    },
  });
  if (!hematology) {
    throw new NotFound(HematologyErrorMessage.notFound, ErrorCode.NOT_FOUND);
  }
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });
  const page = await browser.newPage();
  const data = {
    data: hematology,
  };
  const content = await compiler("hematology", data);

  await page.setContent(content);
  await page.emulateMediaType("screen");
  const filePath = `${process.cwd()}/src/template/mypdf.pdf`;
  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
  });
  await browser.close();
  // Send the PDF buffer as a response
  res.sendFile(filePath);
};
