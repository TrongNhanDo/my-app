import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const validationSchema = (t: TFunction) => {
  const validate = Yup.object().shape({
    email: Yup.string()
      .required(t('user_error:required'))
      .email(t('user_error:email_format')),
  });

  return validate;
};
