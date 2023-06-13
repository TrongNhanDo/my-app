import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { callApi } from "../../../../api/callApi/callApi";
import {
   formatCurrency,
   formatDate,
   scrollTop,
} from "../../../Common/Logic/logics";
import { checkChangeValue, validationSchema } from "./validations";
import { Loader } from "../../../Common/Loader/loader";
import { ActionValues, AgeType, BranchType, SkillType } from "../common/types";
import {
   ActionReducerType,
   FormikBagType,
   StateReducerType,
   initFormikValues,
   initStateReducer,
} from "./types";
import { ErrorMessages } from "../../../Common/ErrorMessage/error-message";
import { upLoadImage } from "../../../../api/callApi/callApiUpload";

export const ProductDetail = () => {
   const navigate = useNavigate();
   const { productId } = useParams();
   const DEFAULT_IMAGE = import.meta.env.VITE_DEFAULT_IMAGE_URL || "";
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const [msg, setMsg] = useState<string>("");
   const [images, setImages] = useState<File[]>();
   const [notChange, setNotChange] = useState<boolean>(false);

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

   const deleteUser = useCallback(
      async (productId: string) => {
         if (confirm("Are you sure you want to delete this product?")) {
            setShowLoader(true);
            const response = await callApi("products", "delete", {
               productId: productId,
            }).catch((err) => console.log({ err }));
            setShowLoader(false);
            if (response) {
               alert("Delete account success");
               navigate(-1);
            } else {
               alert("Delete account fail");
            }
         }
      },
      [navigate]
   );

   const onSubmit = async (formikValues: FormikBagType) => {
      setMsg("");
      const isNotChange = checkChangeValue(formikValues, viewData.product);
      if (isNotChange) {
         setNotChange(true);
         setMsg("There must be at least one data change");
      } else {
         setNotChange(false);
         setShowLoader(true);
         const arrayUrl = await upLoadImage(formikValues.images);
         if (arrayUrl && arrayUrl.length) {
            const requestPayload = {
               ...formikValues,
               images: arrayUrl,
            };
            const response = await callApi(
               "products",
               "patch",
               requestPayload
            ).catch((err) => console.log({ err }));
            // close loader when updated information
            setShowLoader(false);
            if (response) {
               setMsg("Update product success");
               fetchApi();
            } else {
               setMsg("Update product fail");
            }
         } else {
            setMsg("Upload image fail");
         }
      }
      scrollTop();
   };

   const formikBag = useFormik({
      initialValues: initFormikValues,
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

   const ListImage = () => {
      const buttons = [];
      if (images && images.length) {
         for (let index = 0; index < images.length; index++) {
            buttons.push(
               <img
                  className="inline-block"
                  style={{
                     width: "150px",
                     height: "150px",
                     marginRight: "10px",
                     objectFit: "cover",
                  }}
                  key={index}
                  src={URL.createObjectURL(images[index])}
                  alt=""
               />
            );
         }
         return buttons.length > 0 ? buttons : [];
      }
      return [];
   };

   const handleChangImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      const myFiles = files ? Array.from(files) : [];
      formikBag.setFieldValue("images", myFiles);
      setImages(myFiles);
   };

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   useEffect(() => {
      if (viewData.product) {
         formikBag.setFieldValue(
            "productName",
            viewData.product.productName || ""
         );
         formikBag.setFieldValue("ageId", viewData.product.ageId || 1);
         formikBag.setFieldValue("branchId", viewData.product.branchId || 1);
         formikBag.setFieldValue("skillId", viewData.product.skillId || 1);
         formikBag.setFieldValue("price", viewData.product.price || 0);
         formikBag.setFieldValue("describes", viewData.product.describes || "");
         formikBag.setFieldValue("amount", viewData.product.amount || 0);
         formikBag.setFieldValue("images", viewData.product.images || []);
         formikBag.setFieldValue("productId", viewData.product._id || []);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [viewData]);

   return (
      <div className="container">
         {showLoader && <Loader />}
         <div className="mt-10">
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5 uppercase">
               product detail
            </h2>
            {msg && ErrorMessages(msg)}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto">
               <form onSubmit={formikBag.handleSubmit}>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-300">
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
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
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
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                    notChange ||
                                    (formikBag.errors.productName &&
                                       formikBag.touched.productName)
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 value={formikBag.values.productName || ""}
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
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                           >
                              Age Category
                           </th>
                           <td className="px-6 py-4 text-base">
                              {viewData.product.age &&
                              viewData.product.age.ageName
                                 ? viewData.product.age.ageName
                                 : ""}
                           </td>
                           <td className="px-6 py-4">
                              <select
                                 id="ageId"
                                 name="ageId"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                    notChange ||
                                    (formikBag.errors.ageId &&
                                       formikBag.touched.ageId)
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 value={formikBag.values.ageId}
                                 onChange={formikBag.handleChange}
                              >
                                 {viewData.ageCategory &&
                                    viewData.ageCategory.map(
                                       (value: AgeType, index: number) => {
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
                              {formikBag.errors.ageId &&
                                 formikBag.touched.ageId && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.ageId}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                           >
                              Branch Category
                           </th>
                           <td className="px-6 py-4 text-base">
                              {viewData.product.branch &&
                              viewData.product.branch.branchName
                                 ? viewData.product.branch.branchName
                                 : ""}
                           </td>
                           <td className="px-6 py-4">
                              <select
                                 id="branchId"
                                 name="branchId"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                    notChange ||
                                    (formikBag.errors.branchId &&
                                       formikBag.touched.branchId)
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 value={formikBag.values.branchId}
                                 onChange={formikBag.handleChange}
                              >
                                 {viewData.branchCategory &&
                                    viewData.branchCategory.map(
                                       (value: BranchType, index: number) => {
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
                              {formikBag.errors.branchId &&
                                 formikBag.touched.branchId && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.branchId}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                           >
                              Skill Category
                           </th>
                           <td className="px-6 py-4 text-base">
                              {viewData.product.skill &&
                              viewData.product.skill.skillName
                                 ? viewData.product.skill.skillName
                                 : ""}
                           </td>
                           <td className="px-6 py-4">
                              <select
                                 id="skillId"
                                 name="skillId"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                    notChange &&
                                    formikBag.errors.skillId &&
                                    formikBag.touched.skillId
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 value={formikBag.values.skillId}
                                 onChange={formikBag.handleChange}
                              >
                                 {viewData.skillCategory &&
                                    viewData.skillCategory.map(
                                       (value: SkillType, index: number) => {
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
                              {formikBag.errors.skillId &&
                                 formikBag.touched.skillId && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.skillId}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                           >
                              Images
                           </th>
                           <td className="px-6 py-4">
                              {viewData.product.images &&
                              viewData.product.images.length ? (
                                 viewData.product.images.map((value, index) => (
                                    <img
                                       key={index}
                                       className="inline-block"
                                       style={{
                                          width: "150px",
                                          height: "150px",
                                          objectFit: "cover",
                                          marginRight: "10px",
                                       }}
                                       src={value || ""}
                                       alt={value || ""}
                                    />
                                 ))
                              ) : (
                                 <img
                                    className="inline-block"
                                    style={{
                                       width: "150px",
                                       height: "150px",
                                       objectFit: "cover",
                                       marginRight: "10px",
                                    }}
                                    src={DEFAULT_IMAGE || ""}
                                    alt={DEFAULT_IMAGE || ""}
                                 />
                              )}
                           </td>
                           <td className="px-6 py-4">
                              <input
                                 type="file"
                                 name="images"
                                 id="images"
                                 multiple
                                 onChange={(e) => handleChangImage(e)}
                                 className={`${
                                    notChange ||
                                    (formikBag.errors.images &&
                                       formikBag.touched.images)
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                              />
                              {formikBag.errors.images &&
                                 formikBag.touched.images && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.images}
                                    </p>
                                 )}
                              {ListImage && (
                                 <div className="mt-3">{ListImage()}</div>
                              )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
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
                                 value={formikBag.values.price || ""}
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                    notChange ||
                                    (formikBag.errors.price &&
                                       formikBag.touched.price)
                                       ? "bg-yellow"
                                       : ""
                                 } ${
                                    formikBag.errors.price &&
                                    formikBag.touched.price
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 onChange={formikBag.handleChange}
                              />
                              {formikBag.errors.price &&
                                 formikBag.touched.price && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.price}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
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
                                 type="text"
                                 name="amount"
                                 id="amount"
                                 value={formikBag.values.amount || ""}
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                    notChange ||
                                    (formikBag.errors.amount &&
                                       formikBag.touched.amount)
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 onChange={formikBag.handleChange}
                              />
                              {formikBag.errors.amount &&
                                 formikBag.touched.amount && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.amount}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
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
                              {viewData.product.rate || 0}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
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
                                 rows={5}
                                 value={formikBag.values.describes || ""}
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                    notChange ||
                                    (formikBag.errors.describes &&
                                       formikBag.touched.describes)
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 onChange={formikBag.handleChange}
                              />
                              {formikBag.errors.describes &&
                                 formikBag.touched.describes && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.describes}
                                    </p>
                                 )}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
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
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
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
                  onClick={() => deleteUser(viewData.product._id || "")}
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
            </div>
         </div>
      </div>
   );
};
