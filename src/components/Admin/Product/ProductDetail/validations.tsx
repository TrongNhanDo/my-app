import * as Yup from "yup";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      ageId: Yup.string().required(),
      branchId: Yup.string().required(),
      skillId: Yup.string().required(),
      productName: Yup.string().required(),
      price: Yup.string()
         .required()
         .min(1000)
         .matches(/^[0-9]+$/, "Price must be a number"),
      amount: Yup.string()
         .required()
         .min(1)
         .matches(/^[0-9]+$/, "Price must be a number"),
      image1: Yup.string().required(),
      image2: Yup.string().required(),
      image3: Yup.string().required(),
      image4: Yup.string().required(),
      image5: Yup.string().required(),
   });
   return validation;
};
