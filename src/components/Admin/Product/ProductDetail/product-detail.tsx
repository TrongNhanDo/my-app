import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { callApi } from "../../../../api/callApi/callApi";
import { formatCurrency, formatDate } from "../../../Common/Logic/logics";
import { validationSchema } from "./validations";
import { Loader } from "../../../Common/Loader/loader";
import { ActionValues, AgeType, BranchType, SkillType } from "../common/types";
import {
   ActionReducerType,
   FormikBagType,
   StateReducerType,
   initFormikValues,
   initStateReducer,
} from "./types";

export const ProductDetail = () => {
   const navigate = useNavigate();
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const { productId } = useParams();

   const reducer = (state: StateReducerType, action: ActionReducerType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionValues.SELECTED_PRODUCT:
            return payload;
         default:
            return state;
      }
   };

   const [viewData, dispatch] = useReducer(reducer, initStateReducer);

   const fetchApi = useCallback(async () => {
      const url = `products/${productId}`;
      // product
      const response = await callApi(url, "get").catch((err) =>
         console.log({ err })
      );
      // data for age dropdown
      const ageResponse = await callApi("ages", "get").catch((err) =>
         console.log({ err })
      );
      // data for branch dropdown
      const branchResponse = await callApi("branches", "get").catch((err) =>
         console.log({ err })
      );
      // data for skill dropdown
      const skillResponse = await callApi("skills", "get").catch((err) =>
         console.log({ err })
      );
      dispatch({
         type: ActionValues.SELECTED_PRODUCT,
         payload: {
            product: response.data || [],
            ageCategory: ageResponse.data || [],
            branchCategory: branchResponse.data || [],
            skillCategory: skillResponse.data || [],
         },
      });
      setShowLoader(false);
   }, [productId]);

   const onSubmit = useCallback(async (formikValues: FormikBagType) => {
      console.log({ formikValues });
   }, []);

   const formikBag = useFormik({
      initialValues: initFormikValues,
      validationSchema,
      onSubmit,
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

   return (
      <div className="container">
         {showLoader ? (
            <Loader />
         ) : (
            <>
               <div className="mt-10">
                  <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5">
                     ACCOUNT DETAIL
                  </h2>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto">
                     <form onSubmit={formikBag.handleSubmit}>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                 <th scope="col" className="px-6 py-3">
                                    Properties
                                 </th>
                                 <th scope="col" className="px-6 py-3">
                                    Before Change
                                 </th>
                                 <th scope="col" className="px-6 py-3">
                                    After change
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    ProductName
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.productName || ""}
                                 </td>
                                 <td className="px-6 py-4">
                                    <input
                                       type="email"
                                       id="productName"
                                       name="productName"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       value={
                                          formikBag.values.productName ||
                                          viewData.product.productName ||
                                          ""
                                       }
                                       onChange={formikBag.handleChange}
                                    />
                                    {formikBag.errors.productName &&
                                       formikBag.touched.productName && (
                                          <p className="text-orange-600">
                                             {formikBag.errors.productName}
                                          </p>
                                       )}
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Age Category
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.age.ageName}
                                 </td>
                                 <td className="px-6 py-4">
                                    <select
                                       id="role"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       value={formikBag.values.ageId}
                                       onChange={formikBag.handleChange}
                                    >
                                       {viewData.ageCategory &&
                                          viewData.ageCategory.map(
                                             (
                                                value: AgeType,
                                                index: number
                                             ) => {
                                                return (
                                                   <option
                                                      key={index}
                                                      value={value.ageId}
                                                   >
                                                      {value.ageName}
                                                   </option>
                                                );
                                             }
                                          )}
                                    </select>
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Branch Category
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.branch.branchName}
                                 </td>
                                 <td className="px-6 py-4">
                                    <select
                                       id="role"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       value={formikBag.values.ageId}
                                       onChange={formikBag.handleChange}
                                    >
                                       {viewData.branchCategory &&
                                          viewData.branchCategory.map(
                                             (
                                                value: BranchType,
                                                index: number
                                             ) => {
                                                return (
                                                   <option
                                                      key={index}
                                                      value={value.branchId}
                                                   >
                                                      {value.branchName}
                                                   </option>
                                                );
                                             }
                                          )}
                                    </select>
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Skill Category
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.skill.skillName}
                                 </td>
                                 <td className="px-6 py-4">
                                    <select
                                       id="role"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       value={formikBag.values.skillId}
                                       onChange={formikBag.handleChange}
                                    >
                                       {viewData.skillCategory &&
                                          viewData.skillCategory.map(
                                             (
                                                value: SkillType,
                                                index: number
                                             ) => {
                                                return (
                                                   <option
                                                      key={index}
                                                      value={value.skillId}
                                                   >
                                                      {value.skillName}
                                                   </option>
                                                );
                                             }
                                          )}
                                    </select>
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Image
                                 </th>
                                 <td className="px-6 py-4 text-base w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image1 || ""}
                                       alt={viewData.product.image1 || ""}
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image1 || ""}
                                       alt={viewData.product.image1 || ""}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Image
                                 </th>
                                 <td className="px-6 py-4 text-base w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image2 || ""}
                                       alt={viewData.product.image2 || ""}
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image2 || ""}
                                       alt={viewData.product.image2 || ""}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Image
                                 </th>
                                 <td className="px-6 py-4 text-base w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image3 || ""}
                                       alt={viewData.product.image3 || ""}
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image3 || ""}
                                       alt={viewData.product.image3 || ""}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Image
                                 </th>
                                 <td className="px-6 py-4 text-base w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image4 || ""}
                                       alt={viewData.product.image4 || ""}
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image4 || ""}
                                       alt={viewData.product.image4 || ""}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Image
                                 </th>
                                 <td className="px-6 py-4 text-base w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image5 || ""}
                                       alt={viewData.product.image5 || ""}
                                    />
                                 </td>
                                 <td className="px-6 py-4 w-2/5">
                                    <img
                                       className="w-full h-auto"
                                       src={viewData.product.image5 || ""}
                                       alt={viewData.product.image5 || ""}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Price
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {formatCurrency(
                                       viewData.product.price
                                          ? parseFloat(viewData.product.price)
                                          : 0
                                    )}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    <input
                                       type="text"
                                       name="price"
                                       id="price"
                                       value={
                                          formikBag.values.price ||
                                          viewData.product.price ||
                                          ""
                                       }
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       onChange={formikBag.handleChange}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Describes
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.describes || ""}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    <textarea
                                       name="describes"
                                       id="describes"
                                       value={
                                          formikBag.values.describes ||
                                          viewData.product.describes ||
                                          ""
                                       }
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       onChange={formikBag.handleChange}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Amount
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.amount || 0}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    <input
                                       type="number"
                                       name="amount"
                                       id="amount"
                                       value={
                                          formikBag.values.amount ||
                                          viewData.product.amount ||
                                          0
                                       }
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       onChange={formikBag.handleChange}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Rate
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.rate || 0}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    <input
                                       type="number"
                                       name="rate"
                                       id="rate"
                                       value={
                                          formikBag.values.rate ||
                                          viewData.product.rate ||
                                          0
                                       }
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       onChange={formikBag.handleChange}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Created Date
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.createdAt
                                       ? formatDate(viewData.product.createdAt)
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.createdAt
                                       ? formatDate(viewData.product.createdAt)
                                       : ""}
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Updated Date
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.updatedAt
                                       ? formatDate(viewData.product.updatedAt)
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    {viewData.product.updatedAt
                                       ? formatDate(viewData.product.updatedAt)
                                       : ""}
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </form>
                  </div>
                  <div className="flex w-full mt-10 justify-center">
                     <>
                        <button
                           type="button"
                           className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 px-20"
                           onClick={handleSubmit}
                        >
                           Update
                        </button>
                        <button
                           type="button"
                           className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ms-10 px-20"
                        >
                           Delete
                        </button>
                        <button
                           type="button"
                           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 px-20 ms-10"
                           onClick={() => navigate(-1)}
                        >
                           Back
                        </button>
                     </>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};
