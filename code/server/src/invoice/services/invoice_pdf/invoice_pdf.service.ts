import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, createWriteStream, unlinkSync } from 'fs';
import { join } from 'path';
import PDFDocument from 'pdfkit-table';
import { InvoiceData } from './interface/invoice_pdf_interface';
import type { Response } from 'express';

import * as dayjs from 'dayjs';
import { capitalizeFirstLetter } from 'src/helpers/capitalize';
import { calculateItemAmount } from 'src/utils/calculate_item_amount';

@Injectable()
export class InvoicePdfService {
  async createInvoicePDF({
    fileName,
    id,
    doctor,
    patient,
    invoiceDate,
    appointment,
    paymentMode,
    paymentStatus,
    invoiceItems,
  }: InvoiceData) {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 30,
    });

    const path = join(process.cwd(), 'media', 'invoices', fileName);

    const stream = createWriteStream(path);

    doc.pipe(stream);

    doc.fontSize(18).font('Helvetica-Bold');

    doc.text(`Invoice #${id}`, {
      align: 'right',
    });

    doc.moveDown(1).moveTo(30, doc.y).lineTo(570, doc.y).stroke().moveDown(1);

    const lineSize = 120;
    const signatureHeight = 90;
    const startLine1 = 32;

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Doctor Details', startLine1, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .fontSize(12)
      .font('Helvetica')
      .text(
        `${doctor.firstName} ${doctor.lastName}`,
        startLine1,
        signatureHeight + 30,
        {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
        },
      )
      .text(`${doctor.contact}`, startLine1, signatureHeight + 50, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .text(`${doctor.email}`, startLine1, signatureHeight + 70, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize + 86,
      });

    //Patient Details
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Patient Details', startLine1, signatureHeight + 110, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .fontSize(12)
      .font('Helvetica')
      .text(
        `${patient.firstName} ${patient.lastName}`,
        startLine1,
        signatureHeight + 130,
        {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
        },
      )
      .text(`${patient.contact}`, startLine1, signatureHeight + 150, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .text(`${patient.email}`, startLine1, signatureHeight + 170, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize + 86,
      });

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Invoice date:', startLine1 + 320, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .fontSize(12)
      .font('Helvetica')
      .text(
        dayjs(invoiceDate).format('YYYY-MM-DD'),
        startLine1 + 320,
        signatureHeight + 30,
        {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
          continued: true,
        },
      )
      .text(` ${dayjs(invoiceDate).format('HH:mm:ss')}`, {
        height: 40,
      });

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Appointment date:', startLine1 + 320, signatureHeight + 60, {
        columns: 1,
        columnGap: 0,
        height: 40,
      })
      .fontSize(12)
      .font('Helvetica')
      .text(
        appointment.appointmentDate,
        startLine1 + 320,
        signatureHeight + 80,
        {
          columns: 1,
          columnGap: 0,
          height: 40,
          continued: true,
        },
      )
      .text(
        ` ${appointment.appointmentStartTime} To ${appointment.appointmentEndTime}`,
        {
          height: 40,
        },
      );

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Payment Details:', startLine1 + 320, signatureHeight + 120, {
        columns: 1,
        columnGap: 0,
        height: 40,
      })
      .fontSize(12)
      .font('Helvetica')
      .text('Payment Mode:', startLine1 + 320, signatureHeight + 140, {
        columns: 1,
        columnGap: 0,
        height: 40,
        continued: true,
      })
      .text(` ${paymentMode}`, {
        height: 40,
      })
      .fontSize(12)
      .font('Helvetica')
      .text('Payment Status:', startLine1 + 320, signatureHeight + 160, {
        columns: 1,
        columnGap: 0,
        height: 40,
        continued: true,
      })
      .text(` ${paymentStatus}`, {
        height: 40,
      });

    //Medications table
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Invoice summary', startLine1, signatureHeight + 210)
      .moveDown(1);

    const invoiceSummaryTable = {
      headers: ['Sr No', 'Title', 'Amount'],
      rows: [
        ...invoiceItems.map((invoiceItem, index) => {
          return [
            (index + 1).toString(),
            capitalizeFirstLetter(invoiceItem.itemTitle),
            invoiceItem.itemAmount.toString(),
          ];
        }),
      ],
    };

    doc.table(invoiceSummaryTable, {
      padding: [10],
    });

    const itemAmount = calculateItemAmount(invoiceItems as any);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Total', {
        align: 'left',
        continued: true,
      })
      .fontSize(16)
      .font('Helvetica-Bold')
      .text(`$ ${itemAmount}`, {
        align: 'right',
        continued: true,
      });

    doc.end();
  }

  async updateInvoicePDF(
    {
      id,
      doctor,
      patient,
      invoiceDate,
      appointment,
      paymentMode,
      paymentStatus,
      invoiceItems,
    }: InvoiceData,
    fileName: string,
  ) {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 30,
    });

    const path = join(process.cwd(), 'media', 'invoices', fileName);

    const stream = createWriteStream(path);

    doc.pipe(stream);

    doc.fontSize(18).font('Helvetica-Bold');

    doc.text(`Invoice #${id}`, {
      align: 'right',
    });

    doc.moveDown(1).moveTo(30, doc.y).lineTo(570, doc.y).stroke().moveDown(1);

    const lineSize = 120;
    const signatureHeight = 90;
    const startLine1 = 32;

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Doctor Details', startLine1, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .fontSize(12)
      .font('Helvetica')
      .text(
        `${doctor.firstName} ${doctor.lastName}`,
        startLine1,
        signatureHeight + 30,
        {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
        },
      )
      .text(`${doctor.contact}`, startLine1, signatureHeight + 50, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .text(`${doctor.email}`, startLine1, signatureHeight + 70, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize + 86,
      });

    //Patient Details
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Patient Details', startLine1, signatureHeight + 110, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .fontSize(12)
      .font('Helvetica')
      .text(
        `${patient.firstName} ${patient.lastName}`,
        startLine1,
        signatureHeight + 130,
        {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
        },
      )
      .text(`${patient.contact}`, startLine1, signatureHeight + 150, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .text(`${patient.email}`, startLine1, signatureHeight + 170, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize + 86,
      });

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Invoice date:', startLine1 + 320, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
      })
      .fontSize(12)
      .font('Helvetica')
      .text(
        dayjs(invoiceDate).format('YYYY-MM-DD'),
        startLine1 + 320,
        signatureHeight + 30,
        {
          columns: 1,
          columnGap: 0,
          height: 40,
          width: lineSize,
          continued: true,
        },
      )
      .text(` ${dayjs(invoiceDate).format('HH:mm:ss')}`, {
        height: 40,
      });

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Appointment date:', startLine1 + 320, signatureHeight + 60, {
        columns: 1,
        columnGap: 0,
        height: 40,
      })
      .fontSize(12)
      .font('Helvetica')
      .text(
        appointment.appointmentDate,
        startLine1 + 320,
        signatureHeight + 80,
        {
          columns: 1,
          columnGap: 0,
          height: 40,
          continued: true,
        },
      )
      .text(
        ` ${appointment.appointmentStartTime} To ${appointment.appointmentEndTime}`,
        {
          height: 40,
        },
      );

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Payment Details:', startLine1 + 320, signatureHeight + 120, {
        columns: 1,
        columnGap: 0,
        height: 40,
      })
      .fontSize(12)
      .font('Helvetica')
      .text('Payment Mode:', startLine1 + 320, signatureHeight + 140, {
        columns: 1,
        columnGap: 0,
        height: 40,
        continued: true,
      })
      .text(` ${paymentMode}`, {
        height: 40,
      })
      .fontSize(12)
      .font('Helvetica')
      .text('Payment Status:', startLine1 + 320, signatureHeight + 160, {
        columns: 1,
        columnGap: 0,
        height: 40,
        continued: true,
      })
      .text(` ${paymentStatus}`, {
        height: 40,
      });

    //Medications table
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Invoice summary', startLine1, signatureHeight + 210)
      .moveDown(1);

    const invoiceSummaryTable = {
      headers: ['Sr No', 'Title', 'Amount'],
      rows: [
        ...invoiceItems.map((invoiceItem, index) => {
          return [
            (index + 1).toString(),
            capitalizeFirstLetter(invoiceItem.itemTitle),
            invoiceItem.itemAmount.toString(),
          ];
        }),
      ],
    };

    doc.table(invoiceSummaryTable, {
      padding: [10],
    });

    const itemAmount = calculateItemAmount(invoiceItems as any);

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Total', {
        align: 'left',
        continued: true,
      })
      .fontSize(16)
      .font('Helvetica-Bold')
      .text(`$ ${itemAmount}`, {
        align: 'right',
        continued: true,
      });

    doc.end();
  }

  async getInvoicePDF(res: Response, fileName: string) {
    const file = createReadStream(
      join(process.cwd(), 'media', 'invoices', fileName),
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    return new StreamableFile(file);
  }

  async removePDF(fileName: string): Promise<void> {
    const path = join(process.cwd(), 'media', 'invoices', fileName);

    unlinkSync(path);
  }
}
