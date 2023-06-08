import * as Yup from "yup";
import { ProductType } from "../common/types";
import { FormikBagType } from "./types";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      ageId: Yup.string().required(),
      branchId: Yup.string().required(),
      skillId: Yup.string().required(),
      productName: Yup.string().required(),
      price: Yup.string()
         .required()
         .matches(/^[0-9]+$/, "Price must be a number")
         .test({
            message: "price must be more than 1000",
            test: (value) => parseFloat(value) >= 1000,
         }),
      describes: Yup.string().required(),
      amount: Yup.string()
         .required()
         .matches(/^[0-9]+$/, "price must be a number")
         .test({
            message: "amount must be more than 1",
            test: (value) => parseFloat(value) >= 1,
         }),
      image1: Yup.string().required(),
      image2: Yup.string().required(),
      image3: Yup.string().required(),
      image4: Yup.string().required(),
      image5: Yup.string().required(),
   });
   return validation;
};

export const checkChangeValue = (
   formikValues: FormikBagType,
   product: ProductType
) => {
   if (
      formikValues.ageId === product.ageId &&
      formikValues.branchId === product.branchId &&
      formikValues.skillId === product.skillId &&
      formikValues.productName === product.productName &&
      formikValues.price === product.price &&
      formikValues.describes === product.describes &&
      formikValues.amount === product.amount &&
      formikValues.image1 === product.image1 &&
      formikValues.image3 === product.image3 &&
      formikValues.image4 === product.image4 &&
      formikValues.image5 === product.image5 &&
      formikValues.image5 === product.image5
   ) {
      return true;
   }
   return false;
};
