import faker from 'faker';
import * as fs from 'fs';
import nodemailer from 'nodemailer';
import * as path from 'path';

import { MailerCredentials } from './globalMethods';

const credential = MailerCredentials();

const users = [
  {
    job: 'Software Engineer Intern of App Builder',
    name: 'Rebeca Silva',
    photo: 'https://ca.slack-edge.com/T03BTCQAJ-UTG8SUCNP-7ffac2856859-512',
  },
  {
    job: 'Front-End Engineer of App Builder',
    name: 'Adriano Interaminense',
    photo: 'https://ca.slack-edge.com/T03BTCQAJ-U6Y1V782G-1976de2bf335-512',
  },
  {
    job: 'Product Designer of App Builder',
    name: 'Victor Santos',
    photo: 'https://ca.slack-edge.com/T03BTCQAJ-U013QFKFVNH-8706852b1bdc-512',
  },
  {
    job: 'Tech Leader of App Builder',
    name: 'Jeyvison Nascimento',
    photo: 'https://ca.slack-edge.com/T03BTCQAJ-U759CM3R8-906067ca8703-512',
  },
  {
    job: 'Software Engineer of App Builder',
    name: 'Gabriel Albuquerque',
    photo: 'https://ca.slack-edge.com/T03BTCQAJ-UEBM7DRQE-2f4010ebdb1e-512',
  },
  {
    job: 'Flex Tester',
    name: 'Guilherme Pereira',
    photo: 'https://ca.slack-edge.com/T03BTCQAJ-U0130RUGCPJ-558db2b113b1-512',
  },
];

interface EmailTemplate {
  title: string;
  from?: string;
  paragraph1?: string;
  paragraph2?: string;
}

export const getEmailTemplate = ({
  paragraph1 = '',
  paragraph2 = '',
  title,
}: EmailTemplate): string => {
  const { job, name, photo } = users[
    faker.random.number({ max: users.length - 1 })
  ];
  const newPath = path.resolve(__dirname, '..', 'mail', 'index.html');
  let htmlFile = fs.readFileSync(newPath).toString('utf-8');
  htmlFile = htmlFile
    .replace('{{title}}', title)
    .replace('{{paragraph1}}', paragraph1)
    .replace('{{paragraph2}}', paragraph2)
    .replace('{{from}}', name)
    .replace('{{byUserJob}}', job)
    .replace('{{byUserPhoto}}', photo);
  return htmlFile;
};

export default nodemailer.createTransport(credential);
