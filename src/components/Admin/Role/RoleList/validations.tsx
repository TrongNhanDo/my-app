import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      roleId: Yup.string()
         .required()
         .matches(/^[0-9]+$/, "Role Id must be a natural number"),
      roleName: Yup.string().required(),
   });

   return validation;
};
