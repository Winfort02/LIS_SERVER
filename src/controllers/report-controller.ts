import { Response, Request } from "express";
import puppeteer from "puppeteer";
import hbs from "handlebars";
import * as fs from "fs-extra";
import path from "path";
import moment from "moment";
import { prismaClient } from "..";
import { NotFound } from "../exceptions/request";
import {
  HematologyErrorMessage,
  UrinalysisErrorMerssage,
} from "../helpers/error-messages";
import { ErrorCode } from "../exceptions/generic";
import { Hematology } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { GenerateTestReport } from "../service/test.service.";
import { IReportForm } from "../helpers/common";

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
  const { neutrophil, stab, lymphocyties, monocyties, eosinophils, basophils } =
    hematology;

  return (
    getValue(neutrophil) +
    getValue(stab) +
    getValue(lymphocyties) +
    getValue(monocyties) +
    getValue(eosinophils) +
    getValue(basophils)
  );
});

hbs.registerHelper("index", function (num) {
  return num + 1;
});

hbs.registerHelper(
  "fullname",
  function (first: string, middle: string, last: string) {
    return `${first} ${middle} ${last}`;
  }
);

hbs.registerHelper("converter", (value: number | null, converter: number) => {
  if (!value) return null;
  return (value * converter).toFixed(2);
});

const generateBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });
};

export const GenerateHematologyPDF = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const hematology = await prismaClient.hematology.findUnique({
    where: { id },
    include: {
      test: {
        include: {
          patient: true,
        },
      },
    },
  });
  if (!hematology) {
    throw new NotFound(HematologyErrorMessage.notFound, ErrorCode.NOT_FOUND);
  }
  const browser = await generateBrowser();
  const page = await browser.newPage();
  const data = {
    data: hematology,
  };
  const content = await compiler("hematology", data);

  await page.setContent(content);
  await page.emulateMediaType("screen");
  const filePath = `${process.cwd()}/src/pdf/hematology.pdf`;
  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
  });
  await browser.close();
  // Send the PDF buffer as a response
  res.sendFile(filePath);
};

export const GenerateUrinalysisPDF = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const urinalysis = await prismaClient.urinalysis.findUnique({
    where: { id },
    include: {
      test: {
        include: {
          patient: true,
        },
      },
    },
  });
  if (!urinalysis) {
    throw new NotFound(UrinalysisErrorMerssage.NotFound, ErrorCode.NOT_FOUND);
  }
  const browser = await generateBrowser();
  const page = await browser.newPage();
  const content = await compiler("urinalysis", { data: urinalysis });

  await page.setContent(content);
  await page.emulateMediaType("screen");
  const filePath = `${process.cwd()}/src/pdf/urinalysis.pdf`;
  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
  });
  await browser.close();
  // Send the PDF buffer as a response
  res.sendFile(filePath);
};

export const GenerateChemistryPDF = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const chemistry = await prismaClient.chemistry.findUnique({
    where: { id },
    include: {
      test: {
        include: {
          patient: true,
        },
      },
    },
  });
  if (!chemistry) {
    throw new NotFound(UrinalysisErrorMerssage.NotFound, ErrorCode.NOT_FOUND);
  }
  const browser = await generateBrowser();
  const page = await browser.newPage();
  const content = await compiler("chemistry", { data: chemistry });

  await page.setContent(content);
  await page.emulateMediaType("screen");
  const filePath = `${process.cwd()}/src/pdf/chemistry.pdf`;
  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
  });
  await browser.close();
  // Send the PDF buffer as a response
  res.sendFile(filePath);
};

/**
 * Method to generate test report
 * @param req
 * @param res
 * @returns Blob - PDF (Array of Test)
 */
export const GenerateTestReportAsync = async (req: Request, res: Response) => {
  const request = req.body as IReportForm;
  const tests = await GenerateTestReport(request);
  const browser = await generateBrowser();
  const page = await browser.newPage();
  const content = await compiler("test-report", { data: tests });

  await page.setContent(content);
  await page.emulateMediaType("screen");
  const filePath = `${process.cwd()}/src/pdf/test-report.pdf`;
  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
  });
  await browser.close();
  // Send the PDF buffer as a response
  res.sendFile(filePath);
};
