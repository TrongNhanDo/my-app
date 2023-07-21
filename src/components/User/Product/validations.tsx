import { TFunction } from "i18next";
import * as Yup from "yup";

export const validationSchema = (t: TFunction) => {
   const validation = Yup.object().shape({
      userId: Yup.string(),
      productId: Yup.string().required(t("user_error:required")),
      price: Yup.string().required(t("user_error:required")),
      amount: Yup.string().required(t("user_error:required")),
   });

   return validation;
};
