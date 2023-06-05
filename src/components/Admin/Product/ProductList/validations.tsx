import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      ageId: Yup.string().required(),
      branchId: Yup.string().required(),
      skillId: Yup.string().required(),
      productName: Yup.string().required(),
      price: Yup.string()
         .required()
         .test({
            message: "Price must be than 0",
            test: (value) => parseInt(value) > 0,
         }),
      amount: Yup.string()
         .required()
         .test({
            message: "Price must be than 0",
            test: (value) => parseInt(value) > 0,
         }),
      image1: Yup.string().required(),
   });

   return validation;
};
