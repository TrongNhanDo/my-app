import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      roleName: Yup.string().required(),
   });

   return validation;
};
