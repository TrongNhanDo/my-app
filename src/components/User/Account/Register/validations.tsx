import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string()
         .required()
         .min(8, "Password must more than 8 characters")
         .max(32, "Password must less than 32 characters"),
      confirmPwd: Yup.string()
         .required()
         .min(8, "Password must more than 8 characters")
         .max(32, "Password must less than 32 characters"),
   });

   return validation;
};
