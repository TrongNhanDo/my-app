import * as Yup from "yup";
import { FormikPropType, UserType } from "../common/types";

export const validationSchema = () => {
   const validation = Yup.object().shape({
      username: Yup.string().required(),
      roleId: Yup.string().required(),
   });

   return validation;
};

export const checkChangeValues = (
   formikValues: FormikPropType,
   responseApi: UserType
) => {
   if (
      formikValues.username.trim() === responseApi.username &&
      formikValues.roleId == responseApi.roleId
   ) {
      return true;
   }
   return false;
};
