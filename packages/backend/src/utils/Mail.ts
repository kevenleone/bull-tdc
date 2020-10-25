import * as fs from 'fs';
import nodemailer from 'nodemailer';
import * as path from 'path';

import { MailerCredentials } from './globalMethods';

const credential = MailerCredentials();

interface EmailTemplate {
  title: string;
  from?: string;
  paragraph1?: string;
  paragraph2?: string;
}

export const getEmailTemplate = ({
  from = '',
  paragraph1 = '',
  paragraph2 = '',
  title,
}: EmailTemplate) => {
  const newPath = path.resolve(__dirname, '..', 'mail', 'index.html');
  let htmlFile = fs.readFileSync(newPath).toString('utf-8');
  htmlFile = htmlFile
    .replace('{{title}}', title)
    .replace('{{paragraph1}}', paragraph1)
    .replace('{{paragraph2}}', paragraph2)
    .replace('{{from}}', from);
  return htmlFile;
};

export default nodemailer.createTransport(credential);
