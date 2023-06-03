import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      username: Yup.string().required(),
      role: Yup.string().required(),
   });

   return validation;
};
