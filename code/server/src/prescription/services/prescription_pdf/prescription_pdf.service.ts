import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { unlinkSync } from 'fs';

import type { Response } from 'express';
import * as dayjs from 'dayjs';

import PDFDocument from 'pdfkit-table';
import { PrescriptionData } from './interface/prescription_pdf_interface';
import {
  capitalizeEveryWord,
  capitalizeFirstLetter,
} from 'src/helpers/capitalize';
import { Prescription } from './interface/update_prescription_pdf_interface';

@Injectable()
export class PrescriptionPdfService {
  constructor() {}

  async createPrescriptionPDF(
    { prescription, prescriptionMedicines, testReports }: PrescriptionData,
    fileName: string,
  ) {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 30,
    });

    const path = join(process.cwd(), 'media', 'prescriptions', fileName);

    const stream = createWriteStream(path);

    doc.pipe(stream);

    doc.fontSize(18).font('Helvetica-Bold');

    doc.text(`Prescription #${prescription.id}`, {
      align: 'right',
    });

    doc.moveDown(1).moveTo(30, doc.y).lineTo(570, doc.y).stroke().moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Dr')
      .fontSize(12)
      .font('Helvetica')
      .moveDown(0.5)
      .text(
        capitalizeEveryWord(
          `${prescription.doctor.firstName} ${prescription.doctor.lastName}`,
        ),
      )
      .moveDown(0.5)
      .text(`${prescription.doctor.contact}`)
      .moveDown(0.5)
      .text(`${prescription.doctor.email}`);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .moveDown(1)
      .text('Patient')
      .fontSize(12)
      .font('Helvetica')
      .moveDown(0.5)
      .text(
        capitalizeEveryWord(
          `${prescription.patient.firstName} ${prescription.patient.lastName}`,
        ),
      )
      .moveDown(0.5)
      .text(`${prescription.patient.contact}`)
      .moveDown(0.5)
      .text(`${prescription.patient.email}`)
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Prescription Date:', { continued: true })
      .fontSize(12)
      .font('Helvetica')
      .text(`${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}`)
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Appointment Date:', { continued: true })
      .fontSize(12)
      .font('Helvetica')
      .text(`${prescription.appointment.appointmentDate}`)
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Symptoms:', { continued: true })
      .fontSize(14)
      .font('Helvetica')
      .text(capitalizeFirstLetter(`${prescription.symptom}`))
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Diagnosis:', { continued: true })
      .fontSize(14)
      .font('Helvetica')
      .text(capitalizeFirstLetter(`${prescription.diagnosi}`))
      .moveDown(1);

    //Medications table
    doc.fontSize(14).font('Helvetica-Bold').text('Medications').moveDown(1);

    const prescriptionMedicinesTable = {
      headers: ['Sr No', 'Medicine Name', 'Medicine Note'],
      rows: [
        ...prescriptionMedicines.map((prescriptionMedicine, index) => {
          return [
            (index + 1).toString(),
            capitalizeFirstLetter(prescriptionMedicine.medicineName),
            capitalizeFirstLetter(prescriptionMedicine.medicineNote),
          ];
        }),
      ],
    };

    doc.table(prescriptionMedicinesTable, {
      padding: [10],
    });

    doc.moveDown(1);

    //Test Reports table
    const testReportsTable = {
      headers: ['Sr No', 'Test Report Name', 'Test Report Note'],
      rows: [
        ...testReports.map((testReport, index) => {
          return [
            (index + 1).toString(),
            capitalizeFirstLetter(testReport.testReportName),
            capitalizeFirstLetter(testReport.testReportNote),
          ];
        }),
      ],
    };

    doc.fontSize(14).font('Helvetica-Bold').text('Test Reports').moveDown(1);

    doc.table(testReportsTable, {
      padding: [10],
    });

    doc.end();
  }

  async updatePrescriptionPDF(prescription: Prescription, fileName: string) {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 30,
    });

    const path = join(process.cwd(), 'media', 'prescriptions', fileName);

    const stream = createWriteStream(path);

    doc.pipe(stream);

    doc.fontSize(18).font('Helvetica-Bold');

    doc.text(`Prescription #${prescription.id}`, {
      align: 'right',
    });

    doc.moveDown(1).moveTo(30, doc.y).lineTo(570, doc.y).stroke().moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Dr')
      .fontSize(12)
      .font('Helvetica')
      .moveDown(0.5)
      .text(
        capitalizeEveryWord(
          `${prescription.doctor.firstName} ${prescription.doctor.lastName}`,
        ),
      )
      .moveDown(0.5)
      .text(`${prescription.doctor.contact}`)
      .moveDown(0.5)
      .text(`${prescription.doctor.email}`);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .moveDown(1)
      .text('Patient')
      .fontSize(12)
      .font('Helvetica')
      .moveDown(0.5)
      .text(
        capitalizeEveryWord(
          `${prescription.patient.firstName} ${prescription.patient.lastName}`,
        ),
      )
      .moveDown(0.5)
      .text(`${prescription.patient.contact}`)
      .moveDown(0.5)
      .text(`${prescription.patient.email}`)
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Prescription Date:', { continued: true })
      .fontSize(12)
      .font('Helvetica')
      .text(`${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}`)
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Appointment Date:', { continued: true })
      .fontSize(12)
      .font('Helvetica')
      .text(`${prescription.appointment.appointmentDate}`)
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Symptoms:', { continued: true })
      .fontSize(14)
      .font('Helvetica')
      .text(capitalizeFirstLetter(`${prescription.symptom}`))
      .moveDown(1);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Diagnosis:', { continued: true })
      .fontSize(14)
      .font('Helvetica')
      .text(capitalizeFirstLetter(`${prescription.diagnosi}`))
      .moveDown(1);

    doc.fontSize(14).font('Helvetica-Bold').text('Medications').moveDown(1);

    const prescriptionMedicinesTable = {
      headers: ['Sr No', 'Medicine Name', 'Medicine Note'],
      rows: [
        ...prescription.prescriptionMedicine.map(
          (prescriptionMedicine, index) => {
            return [
              (index + 1).toString(),
              capitalizeFirstLetter(prescriptionMedicine.medicineName),
              capitalizeFirstLetter(prescriptionMedicine.medicineNote),
            ];
          },
        ),
      ],
    };

    doc.table(prescriptionMedicinesTable, {
      padding: [10],
    });

    doc.moveDown(1);

    //Test Reports table
    const testReportsTable = {
      headers: ['Sr No', 'Test Report Name', 'Test Report Note'],
      rows: [
        ...prescription.testReport.map((testReport, index) => {
          return [
            (index + 1).toString(),
            capitalizeFirstLetter(testReport.testReportName),
            capitalizeFirstLetter(testReport.testReportNote),
          ];
        }),
      ],
    };

    doc.fontSize(14).font('Helvetica-Bold').text('Test Reports').moveDown(1);

    doc.table(testReportsTable, {
      padding: [10],
    });

    doc.end();
  }

  async getPrescriptionPDF(res: Response, fileName: string) {
    const file = createReadStream(
      join(process.cwd(), 'media', 'prescriptions', fileName),
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    return new StreamableFile(file);
  }

  async removePDF(fileName: string): Promise<void> {
    const path = join(process.cwd(), 'media', 'prescriptions', fileName);

    unlinkSync(path);
  }
}
