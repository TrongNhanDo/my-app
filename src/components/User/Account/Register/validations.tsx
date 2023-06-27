import { TFunction } from "i18next";
import * as Yup from "yup";

export const validationSchema = (t: TFunction) => {
   const validation = Yup.object().shape({
      email: Yup.string().email().required(t("user.error.email_required")),
      password: Yup.string()
         .required(t("user.error.password_required"))
         .min(8, t("user.error.password_min_length", [8]))
         .max(32, t("user.error.password_max_length", [32])),
      confirmPwd: Yup.string().required(t("user.error.confirmPwd_required")),
   });

   return validation;
};
