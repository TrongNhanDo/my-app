import * as Yup from "yup";
import { FormikPropType } from "../common/types";
import { UserType } from "./types";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      username: Yup.string().required(),
      role: Yup.string().required(),
   });

   return validation;
};

export const checkChangeValues = (
   formikValues: FormikPropType,
   responseApi: UserType
) => {
   if (
      formikValues.username.trim() === responseApi.username &&
      formikValues.role == responseApi.role
   ) {
      return true;
   }
   return false;
};
