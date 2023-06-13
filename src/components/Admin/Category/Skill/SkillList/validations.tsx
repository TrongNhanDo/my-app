import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      skillId: Yup.string()
         .required()
         .matches(/^[0-9]+$/, "Skill ID must be a natural number"),
      skillName: Yup.string().required(),
   });

   return validation;
};
