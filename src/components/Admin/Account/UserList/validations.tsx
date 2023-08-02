import * as Yup from 'yup';

export const validationSchema = () => {
   const validation = Yup.object().shape({
      username: Yup.string().required().email(),
      password: Yup.string().required().min(8).max(32),
      confirmPwd: Yup.string().required().min(8).max(32),
      roleId: Yup.string().required(),
   });

   return validation;
};

export const validationConfirmPwd = (value1: string, value2: string) => {
   if (value1 && value2 && value1 !== value2) {
      return 'Confirm password not matched with password';
   }
   return '';
};
