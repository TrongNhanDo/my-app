import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { callApi } from "../../../api/callApi/callApi";
import { CartItemType, FormikInitValues, FormikProps } from "./types";
import { formatCurrency } from "../../Common/Logic/logics";
import Loader from "../../Common/Loader/loader";
import { validationSchema } from "./validations";

const CartList = React.memo(() => {
   const [viewData, setViewData] = useState<CartItemType[]>();
   const [loading, setLoading] = useState<boolean>(false);

   const fetchApi = useCallback(async () => {
      setLoading(true);
      const response = await callApi("carts/get-by-userId", "post", {
         userId: "64760a06575933907791ab2e",
      }).catch((err) => console.log({ err }));

      const data: CartItemType[] = response.data;
      if (data) {
         setViewData(data);
      }
      setLoading(false);
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
      validationSchema,
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
         return viewData.reduce((sum, cur) => sum + cur.amount, 0);
      }
      return 0;
   }, [viewData]);

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
         <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
               <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">{`${totalProducts} Items`}</h2>
               </div>
               <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                     Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                     Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                     Price
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                     Total
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
                                 <div className="flex w-2/5">
                                    <div className="flex w-2/5 items-center">
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
                                    <div className="flex flex-col justify-between ml-4 flex-grow w-3/5">
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
                                             ? value.product.branch.branchName
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
                                 <div className="flex justify-center w-1/5">
                                    <input
                                       type="number"
                                       name={`cartItem[${index}].amount`}
                                       id={`cartItem[${index}].amount`}
                                       min={1}
                                       value={
                                          formikBag.values.cartItem[index]
                                             ? formikBag.values.cartItem[index]
                                                  .amount
                                             : 1
                                       }
                                       className="ms-5 px-4 py-2 rounded border-solid border-2 border-gray-200 font-bold text-base w-24"
                                       onChange={formikBag.handleChange}
                                    />
                                 </div>
                                 <span className="text-center w-1/5 font-semibold text-sm">
                                    {formatCurrency(value.price || 0)}
                                 </span>
                                 <span className="text-center w-1/5 font-semibold text-sm">
                                    {formatCurrency(value.total || 0)}
                                 </span>
                              </div>
                              <hr />
                           </div>
                        );
                     })}
               </form>
               <div className="flex w-full items-center justify-around mt-5">
                  <Link
                     to="/product-list"
                     className="flex font-bold hover:text-orange-400 text-indigo-600 text-sm w-fit"
                  >
                     ⬅ Continue Shopping
                  </Link>
                  <button
                     type="button"
                     onClick={handleSubmit}
                     className="block py-1 px-3 bg-green-600 text-white rounded hover:bg-green-500"
                  >
                     Cập nhật giỏ hàng
                  </button>
               </div>
            </div>
            <div
               id="summary"
               className="w-1/4 px-8 py-10 border-solid border-2 border-gray-200"
            >
               <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
               </h1>
               <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                     {`Items: ${totalProducts || 0}`}
                  </span>
                  <span className="font-semibold text-sm">
                     Total: {formatCurrency(totalPrices || 0)}
                  </span>
               </div>
               <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                     Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm rounded">
                     <option>Giao hàng tiêu chuẩn</option>
                     <option>Giao hàng hỏa tốc ( Nội thành )</option>
                  </select>
               </div>
               <div className="py-10">
                  <label
                     htmlFor="promo"
                     className="font-semibold inline-block mb-3 text-sm uppercase"
                  >
                     Promo Code
                  </label>
                  <input
                     type="text"
                     id="promo"
                     placeholder="Enter your code"
                     className="p-2 text-sm w-full rounded"
                  />
               </div>
               <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded">
                  Apply
               </button>
               <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                     <span>Total cost</span>
                     <span>$600</span>
                  </div>
                  <button
                     type="button"
                     className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded"
                  >
                     Checkout
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
});

export default CartList;
