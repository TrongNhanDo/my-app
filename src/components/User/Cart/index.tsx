import React, {
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { callApi } from "../../../api/callApi/callApi";
import { CartItemType, FormikInitValues, FormikProps } from "./types";
import { formatCurrency } from "../../Common/Logic/logics";
import Loader from "../../Common/Loader/loader";
import { validationSchema } from "./validations";
import { SumProductContext } from "../../../context/SumProductContext";

const CartList = React.memo(() => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [viewData, setViewData] = useState<CartItemType[]>();
   const [loading, setLoading] = useState<boolean>(false);
   const { setSumProduct, userId } = useContext(SumProductContext);

   useEffect(() => {
      const currentUserId = sessionStorage.getItem("userId");
      if (!currentUserId) {
         navigate("/login");
      }
   });

   const fetchApi = useCallback(async () => {
      setLoading(true);
      const response = await callApi("carts/get-by-userId", "post", {
         userId: userId,
      }).catch((err) => console.log({ err }));

      const data: CartItemType[] = response.data;
      if (data) {
         setViewData(data);
      }
      setLoading(false);
   }, [userId]);

   const handleDelete = useCallback(async (cartId: string) => {
      try {
         console.log({ cartId });
         setLoading(true);
         await callApi("carts", "delete", { id: cartId }).catch((err) =>
            console.log({ err })
         );
         setLoading(false);
         fetchApi();
      } catch (error) {
         console.log({ error });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const onSubmit = useCallback(async (formikValues: FormikProps) => {
      setLoading(true);
      await callApi("carts/update-cart/", "post", formikValues).catch((err) =>
         console.log({ err })
      );
      setLoading(false);
      fetchApi();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const formikBag = useFormik({
      initialValues: FormikInitValues,
      validationSchema: validationSchema(t),
      onSubmit: (value) => onSubmit(value),
   });

   const handleSubmit = useCallback(() => {
      try {
         formikBag.submitForm();
      } catch (error) {
         console.log({ error });
      }
   }, [formikBag]);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   const totalProducts = useMemo(() => {
      if (viewData && viewData.length) {
         const total = viewData.reduce((sum, cur) => sum + cur.amount, 0);
         setSumProduct(total);
         return total;
      }
      setSumProduct(0);
      return 0;
   }, [viewData, setSumProduct]);

   const totalPrices = useMemo(() => {
      if (viewData && viewData.length) {
         return viewData.reduce((sum, cur) => sum + parseFloat(cur.total), 0);
      }
      return 0;
   }, [viewData]);

   useEffect(() => {
      if (viewData && viewData.length) {
         formikBag.setFieldValue("userId", viewData[0].userId || "");
         viewData.map((value: CartItemType, index: number) => {
            formikBag.setFieldValue(
               `cartItem[${index}].productId`,
               value.productId
            );
            formikBag.setFieldValue(`cartItem[${index}].amount`, value.amount);
            formikBag.setFieldValue(`cartItem[${index}].price`, value.price);
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [viewData]);

   return (
      <div className="div-contai mx-auto rounded">
         {loading && <Loader />}
         {viewData && viewData.length ? (
            <div className="flex shadow-md my-10">
               <div className="w-3/4 bg-white px-10 py-10">
                  <div className="flex justify-between border-b pb-8">
                     <h1 className="font-semibold text-2xl">
                        {t("user.cart.title")}
                     </h1>
                     <h2 className="font-semibold text-2xl">
                        {totalProducts + " " + t("user.cart.product")}
                     </h2>
                  </div>
                  <div className="flex mt-10 mb-5">
                     <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/6">
                        {t("user.cart.header1")}
                     </h3>
                     <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 text-center">
                        {t("user.cart.header2")}
                     </h3>
                     <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 text-center">
                        {t("user.cart.header3")}
                     </h3>
                     <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 text-center">
                        {t("user.cart.header4")}
                     </h3>
                     <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 text-center">
                        {t("user.cart.header5")}
                     </h3>
                  </div>
                  <hr />
                  <form onSubmit={formikBag.handleSubmit}>
                     {viewData &&
                        viewData.length &&
                        viewData.map((value: CartItemType, index: number) => {
                           return (
                              <div key={value._id}>
                                 <div className="flex items-center hover:bg-gray-100 py-5">
                                    <div className="flex w-2/6">
                                       <div className="flex w-2/6 items-center">
                                          <img
                                             className="h-24 object-cover"
                                             src={
                                                value.product &&
                                                value.product.images.length &&
                                                value.product.images[0]
                                                   ? value.product.images[0]
                                                   : import.meta.env
                                                        .VITE_IMAGE_NOT_FOUND
                                             }
                                             alt=""
                                          />
                                       </div>
                                       <div className="flex flex-col justify-between ml-4 flex-grow w-3/6">
                                          <span className="font-bold line-clamp-2">
                                             {value.product &&
                                             value.product.productName
                                                ? value.product.productName
                                                : ""}
                                          </span>
                                          <span className="text-sm">
                                             {value.product &&
                                             value.product.branch &&
                                             value.product.branch &&
                                             value.product.branch.branchName
                                                ? value.product.branch
                                                     .branchName
                                                : ""}
                                          </span>
                                          <span className="text-sm">
                                             {value.product &&
                                             value.product.age &&
                                             value.product.age &&
                                             value.product.age.ageName
                                                ? value.product.age.ageName
                                                : ""}
                                          </span>
                                          <span className="text-sm">
                                             {value.product &&
                                             value.product.skill &&
                                             value.product.skill &&
                                             value.product.skill.skillName
                                                ? value.product.skill.skillName
                                                : ""}
                                          </span>
                                       </div>
                                    </div>
                                    <div className="flex justify-center w-1/6">
                                       <input
                                          type="number"
                                          name={`cartItem[${index}].amount`}
                                          id={`cartItem[${index}].amount`}
                                          min={1}
                                          value={
                                             formikBag.values.cartItem[index]
                                                ? formikBag.values.cartItem[
                                                     index
                                                  ].amount
                                                : 1
                                          }
                                          className="ms-5 px-4 py-2 rounded border-solid border-2 border-gray-200 font-bold text-base w-24"
                                          onChange={formikBag.handleChange}
                                       />
                                    </div>
                                    <span className="text-center w-1/6 font-semibold text-sm">
                                       {formatCurrency(value.price || 0)}
                                    </span>
                                    <span className="text-center w-1/6 font-semibold text-sm">
                                       {formatCurrency(value.total || 0)}
                                    </span>
                                    <div className="flex w-1/6 justify-center">
                                       <button
                                          className="font-semibold text-sm w-fit hover:bg-red-600 p-1 rounded"
                                          type="button"
                                          onClick={() =>
                                             handleDelete(value._id || "")
                                          }
                                       >
                                          ❌
                                       </button>
                                    </div>
                                 </div>
                                 <hr />
                              </div>
                           );
                        })}
                  </form>
                  <div className="flex w-full items-center justify-around mt-5">
                     <Link
                        to="/product-list"
                        className="block py-1 px-3 bg-orange-600 text-white rounded hover:bg-orange-500"
                     >
                        {t("user.cart.btn_continue")}
                     </Link>
                     <button
                        type="button"
                        onClick={handleSubmit}
                        className="block py-1 px-3 bg-green-600 text-white rounded hover:bg-green-500"
                     >
                        {t("user.cart.btn_update")}
                     </button>
                  </div>
               </div>
               <div
                  id="summary"
                  className="w-1/4 px-8 py-10 border-solid border-2 border-gray-200"
               >
                  <h1 className="font-semibold text-2xl border-b pb-8">
                     {t("user.cart.title2")}
                  </h1>
                  <div className="flex justify-between mt-10 mb-5">
                     <span className="font-semibold text-sm uppercase">
                        {t("user.cart.product") + ": "}
                        {totalProducts || 0}
                     </span>
                     <span className="font-semibold text-sm">
                        {t("user.cart.header4")}:{" "}
                        {formatCurrency(totalPrices || 0)}
                     </span>
                  </div>
                  <div>
                     <label className="font-medium inline-block mb-3 text-sm uppercase">
                        {t("user.cart.shipping_method")}
                     </label>
                     <select className="block p-2 text-gray-600 w-full text-sm rounded">
                        <option>{t("user.cart.shipping_method1")}</option>
                        <option>{t("user.cart.shipping_method2")}</option>
                     </select>
                  </div>
                  <div className="py-10">
                     <label
                        htmlFor="promo"
                        className="font-semibold inline-block mb-3 text-sm uppercase"
                     >
                        {t("user.cart.promotion_code")}
                     </label>
                     <input
                        type="text"
                        id="promo"
                        placeholder={t("user.cart.promotion_code_placeholder")}
                        className="p-2 text-sm w-full rounded"
                     />
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded">
                     {t("user.cart.btn_apply")}
                  </button>
                  <div className="border-t mt-8">
                     <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>{t("user.cart.total_cost")}</span>
                        <span>{formatCurrency(totalPrices || 0)}</span>
                     </div>
                     <button
                        type="button"
                        className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded"
                     >
                        {t("user.cart.btn_checkout")}
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <div className="flex flex-col w-full rounded items-center bg-white mt-10 py-10">
               <span className="text-2xl font-bold"> Giỏ hàng rỗng</span>
               <Link
                  to="/product-list"
                  className="mt-5 underline text-blue-600 hover:text-blue-400"
               >
                  Mua sắm sản phẩm
               </Link>
            </div>
         )}
      </div>
   );
});

export default CartList;
