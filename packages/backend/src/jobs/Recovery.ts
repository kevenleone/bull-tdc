import { constants, defaults } from '~/utils/globalMethods';
import Mail, { getEmailTemplate } from '~/utils/Mail';

const { APP_NAME, MAIL_FROM } = defaults;
const { JOB_RECOVERY_MAILER } = constants;

export const handle = async ({ data }: any): Promise<void> => {
  const { email, name = 'kevenleone' } = data;
  const htmlFile = getEmailTemplate({
    from: 'Keven Leone',
    paragraph1: 'You can recovery your account, by clicking on button bellow',
    title: name,
  });
  const config = {
    from: `${APP_NAME} Team <${MAIL_FROM}>`,
    html: htmlFile,
    subject: 'Liferay TDC | Account Recovery',
    to: `${name} <${email}>`,
  };
  await Mail.sendMail(config);
};

export default {
  handle,
  name: JOB_RECOVERY_MAILER,
};
