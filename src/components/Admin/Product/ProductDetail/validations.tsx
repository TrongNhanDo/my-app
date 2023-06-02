import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({});
   return validation;
};
