import * as Yup from "yup";

export const validationSchema = () => {
   const validate = Yup.object().shape({
      userId: Yup.string().required(),
      cartItem: Yup.array().of(
         Yup.object().shape({
            productId: Yup.string().required(),
            amount: Yup.string()
               .required()
               .test({
                  message: "Số lượng sản phẩm phải là số tự nhiên",
                  test: (value) => parseInt(value || "0") > 0,
               }),
            price: Yup.string()
               .required()
               .test({
                  message: "Giá sản phẩm phải là số tự nhiên",
                  test: (value) => parseInt(value || "0") > 0,
               }),
         })
      ),
   });

   return validate;
};
