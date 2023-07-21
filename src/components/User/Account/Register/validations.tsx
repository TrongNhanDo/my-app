import { TFunction } from "i18next";
import * as Yup from "yup";

export const validationSchema = (t: TFunction) => {
   const validation = Yup.object().shape({
      email: Yup.string().email().required(t("user_error:required")),
      password: Yup.string()
         .required(t("user_error:required"))
         .min(8, t("user_error:password_min_length", [8]))
         .max(32, t("user_error:password_max_length", [32])),
      confirmPwd: Yup.string().required(t("user_error:required")),
   });

   return validation;
};
