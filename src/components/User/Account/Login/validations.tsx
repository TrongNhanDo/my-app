import { TFunction } from "i18next";
import * as Yup from "yup";

export const validationSchema = (t: TFunction) => {
   const validation = Yup.object().shape({
      email: Yup.string().email().required(t("error:required")),
      password: Yup.string().required(t("error:required")),
   });

   return validation;
};
