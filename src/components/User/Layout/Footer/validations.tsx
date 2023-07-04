import { TFunction } from "i18next";
import * as Yup from "yup";

export const validationSchema = (t: TFunction) => {
   const validate = Yup.object().shape({
      email: Yup.string()
         .required(t("user.error.required"))
         .email(t("user.error.email_format")),
   });

   return validate;
};
