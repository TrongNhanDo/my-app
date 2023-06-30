import { TFunction } from "i18next";
import * as Yup from "yup";

export const validationSchema = (t: TFunction) => {
   const validation = Yup.object().shape({
      email: Yup.string().email().required(t("user.error.required")),
      password: Yup.string().required(t("user.error.required")),
   });

   return validation;
};
