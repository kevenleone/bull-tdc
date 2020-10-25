import { constants, defaults } from '~/utils/globalMethods';
import Mail, { getEmailTemplate } from '~/utils/Mail';

const { APP_NAME, MAIL_FROM } = defaults;
const { JOB_REGISTRATION_MAILER } = constants;

export default {
  async handle({ data }: any): Promise<void> {
    const { email, firstName } = data;
    const htmlFile = getEmailTemplate({
      from: 'Keven Leone',
      paragraph1:
        'Recently an account with this email have been registered, thanks for being part of Liferay TDC',
      title: firstName,
    });
    const config = {
      from: `${APP_NAME} Team <${MAIL_FROM}>`,
      html: htmlFile,
      subject: 'Liferay TDC | Account Register',
      to: `${firstName} <${email}>`,
    };
    await Mail.sendMail(config);
  },
  name: JOB_REGISTRATION_MAILER,
};
