import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      skillName: Yup.string().required(),
   });

   return validation;
};
