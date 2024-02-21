import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailInterface } from './interfaces/mail_interface';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({
    to,
    template,
    subject,
    context,
  }: MailInterface): Promise<SentMessageInfo> {
    try {
      const CONSOLE = process.env.CONSOLE;

      if (!CONSOLE) {
        return await this.mailerService.sendMail({
          to,
          from: process.env.MAILER_USER,
          subject,
          template,
          context,
        });
      }

      console.log(context);
      console.log(`template ${template}`);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
