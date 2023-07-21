import { TFunction } from "i18next";
import * as Yup from "yup";

export const validationSchema = (t: TFunction) => {
   const validate = Yup.object().shape({
      userId: Yup.string().required(t("error:required")),
      cartItem: Yup.array().of(
         Yup.object().shape({
            productId: Yup.string().required(t("error:required")),
            amount: Yup.string()
               .required(t("error:required"))
               .test({
                  message: "Số lượng sản phẩm phải là số tự nhiên",
                  test: (value) => parseInt(value || "0") > 0,
               }),
            price: Yup.string()
               .required(t("error:required"))
               .test({
                  message: "Giá sản phẩm phải là số tự nhiên",
                  test: (value) => parseInt(value || "0") > 0,
               }),
         })
      ),
   });

   return validate;
};
