import { dynamicEnv } from 'dharma-ui-common';

export const environment = {
  production: true,
  SIGNUP_API_DEFAULT: 'https://uat.dotznext.com/signup/api/',
  ACCOUNTS_SSO: 'https://login.dotz.com.br/',
  ACCOUNTS_API: 'https://uat.dotznext.com/accounts/api/default/',
  DOCUMENT_API: 'https://uat.dotznext.com/documents/api/default/',
  HELPDESK_URL: 'https://uat.dotznext.com/help-desk/ui/contact/contact',
  AGREEMENTS_TERM_CODE_SITE_DOTZ: '08',
  DEVICE_MAPPER_CLIENT: 'dotz_hmg',
  DEVICE_MAPPER_URL: 'https://dotz.dnofd.com/ofdb/OFDB.js',
  SSO_CLIENT_ID_LP: '05AF112B7D36',
  SSO_CLIENT_SECRET_LP: '73255FBF42BF4CA5',
  BASE_PATH_DIGITAL_ACCOUNT: '/signup/ui/digitalaccount',
  SITE_DOTZ: 'http://www.dotz.com.br',
  RECAPTCHA_ENABLED: false,
  RECAPTCHA_CODE_ESCAPE: '',
  RECAPTCHA_SITEKEY: '6Lf66pkUAAAAALy7lqv7bqAxCYKK0TbQ3CYhvYMz',
  LIST_SCOPES: 'agreements.api payments.api kyc.api members.api wallet.api signup.api accounts.api rewards.api redemptions.api wishlist.api addressdata.api multicampaign.api capture.api offline_access program_id',
  DEVICE_MAPPER_UI_CHANNEL: 2,
  ...dynamicEnv,
};
