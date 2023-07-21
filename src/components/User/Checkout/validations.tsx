import { TFunction } from "i18next";
import * as Yup from "yup";

export const validationSchema = (t: TFunction) => {
   const validate = Yup.object().shape({
      fullname: Yup.string().required(t("error:required")),
      gender: Yup.string().required(t("error:required")),
      phone: Yup.string()
         .required(t("error:required"))
         .matches(
            /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
            t("error:mail_formed")
         ),
      address: Yup.string().required(t("error:required")),
      payment_method: Yup.string().required(t("error:required")),
   });

   return validate;
};
