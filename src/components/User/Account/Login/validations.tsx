import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
   });

   return validation;
};
