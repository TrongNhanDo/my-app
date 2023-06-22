import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      userId: Yup.string().required(),
      productId: Yup.string().required(),
      price: Yup.string().required(),
      amount: Yup.string().required(),
   });

   return validation;
};
