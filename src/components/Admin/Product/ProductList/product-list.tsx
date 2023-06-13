import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Loader } from "../../../Common/Loader/loader";
import {
   ActionValues,
   AgeType,
   BranchType,
   ProductType,
   SkillType,
} from "../common/types";
import { formatDate } from "../../../Common/Logic/logics";
import { callApi } from "../../../../api/callApi/callApi";
import {
   ActionReducerType,
   FormikBagType,
   InitFormikValues,
   ProductListType,
   StateReducerType,
} from "./types";
import { validationSchema } from "./validations";
import { upLoadImage } from "../../../../api/callApi/callApiUpload";
import { ModalCustom } from "../../../Common/Modal/modal-custom";

export const ProductList = () => {
   const DEFAULT_IMAGE = import.meta.env.VITE_DEFAULT_IMAGE_URL || "";
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const dataPerpage = parseInt(import.meta.env.VITE_PER_PAGE || 10);
   const [images, setImages] = useState<File[]>();
   const [error, setError] = useState<string>("");
   const [success, setSuccess] = useState<boolean>(false);
   const [modal, setModal] = useState<boolean>(false);
   const [viewData, setViewData] = useState<StateReducerType>();

   const fetchApiDropdown = useCallback(async () => {
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
      setViewData({
         ageCategory: ageResponse.data || [],
         branchCategory: branchResponse.data || [],
         skillCategory: skillResponse.data || [],
      });
      setShowLoader(false);
   }, []);

   useEffect(() => {
      fetchApiDropdown();
   }, [fetchApiDropdown]);

   const reducer = (state: ProductListType, action: ActionReducerType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionValues.GET_PRODUCTS:
            return {
               ...state,
               ...payload,
            };
         default:
            return state;
      }
   };

   const initState = {
      products: [],
      totalPage: 0,
      count: 0,
      returnCnt: 0,
   };

   const [data, dispatch] = useReducer(reducer, initState);

   const fetchApi = useCallback(async () => {
      const response = await callApi("products/paginate", "post", {
         perPage: dataPerpage,
         page: 1,
      });
      const data: ProductListType = response.data || null;
      dispatch({
         type: ActionValues.GET_PRODUCTS,
         payload: data,
      });
      setShowLoader(false);
   }, [dataPerpage]);

   const changePage = useCallback(async (perPage: number, page: number) => {
      setShowLoader(true);
      const response = await callApi("products/paginate", "post", {
         perPage: perPage || 10,
         page: page || 1,
      }).catch((err) => console.log({ err }));
      const data: ProductListType = response.data || null;
      dispatch({
         type: ActionValues.GET_PRODUCTS,
         payload: data,
      });
      setShowLoader(false);
   }, []);

   const Pagination = useMemo(() => {
      const buttons = [];
      for (let index = 1; index <= data.totalPage; index++) {
         buttons.push(
            <button
               key={index}
               type="button"
               className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
               onClick={() => changePage(dataPerpage, index)}
            >
               {index}
            </button>
         );
      }
      return buttons.length > 0 ? buttons : [];
   }, [changePage, data, dataPerpage]);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   const onSubmit = useCallback(async (formikValues: FormikBagType) => {
      setShowLoader(true);
      const arrayUrl = await upLoadImage(formikValues.images);
      if (arrayUrl.length) {
         const requestPayload = {
            ...formikValues,
            images: arrayUrl,
         };
         await callApi("products", "post", requestPayload)
            .then(() => {
               setSuccess(true);
               setImages([]);
               alert("Add product success");
            })
            .catch((err) => {
               console.log({ err });
               alert("Add product fail");
            });
      } else {
         alert("Upload image fail");
      }
      setShowLoader(false);
   }, []);

   const formikBag = useFormik({
      initialValues: InitFormikValues,
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

   const handleChangImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      const myFiles = files ? Array.from(files) : [];
      formikBag.setFieldValue("images", myFiles);
      setImages(myFiles);
   };

   const ListImage = () => {
      const buttons = [];
      if (images && images.length) {
         for (let index = 0; index < images.length; index++) {
            buttons.push(
               <img
                  className="inline-block"
                  style={{
                     width: "200px",
                     height: "200px",
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

   const handleClose = useCallback(() => {
      try {
         formikBag.resetForm();
         setModal(false);
         setError("");
      } catch (error) {
         console.log({ error });
      }
   }, [formikBag]);

   useEffect(() => {
      if (success) {
         formikBag.resetForm();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [success]);

   useEffect(() => {
      if (modal) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }
   });

   return (
      <div className="div-contai mb-10">
         {showLoader && <Loader />}
         <div>
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5">
               LIST OF PRODUCTS
            </h2>
            <div className="flex justify-center mb-2">
               <button
                  className="block bg-blue-300 hover:bg-blue-400 px-3 py-2 rounded"
                  onClick={() => setModal(true)}
               >
                  Add Skill Category
               </button>
               {modal && (
                  <ModalCustom>
                     <form
                        onSubmit={formikBag.handleSubmit}
                        className="width-70vh"
                     >
                        <div className="flex w-full justify-between text-2xl font-bold">
                           <div className="uppercase">add new skill</div>
                           <button type="button" onClick={handleClose}>
                              ❌
                           </button>
                        </div>
                        <hr className="w-full my-3 h-0.5" />
                        {error && error !== "" && (
                           <div className="bg-lime-300 w-full text-orange-600 mt-4 py-2 px-5 rounded-md">
                              {error}
                           </div>
                        )}
                        <div className="">
                           <label htmlFor="productName">Product Name:</label>
                           <input
                              type="email"
                              id="productName"
                              name="productName"
                              placeholder="Enter product name"
                              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base mt-1 ${
                                 formikBag.errors.productName &&
                                 formikBag.touched.productName
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
                        </div>
                        <div className="mt-3">
                           <label htmlFor="productName">Age Category:</label>
                           <select
                              name="ageId"
                              id="ageId"
                              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                 formikBag.errors.ageId &&
                                 formikBag.touched.ageId
                                    ? "bg-yellow"
                                    : ""
                              }`}
                              value={formikBag.values.ageId}
                              onChange={formikBag.handleChange}
                           >
                              {viewData &&
                                 viewData.ageCategory &&
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
                        </div>
                        <div className="mt-3">
                           <label htmlFor="productName">Branch Category:</label>
                           <select
                              name="branchId"
                              id="branchId"
                              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                 formikBag.errors.branchId &&
                                 formikBag.touched.branchId
                                    ? "bg-yellow"
                                    : ""
                              }`}
                              value={formikBag.values.branchId}
                              onChange={formikBag.handleChange}
                           >
                              {viewData &&
                                 viewData.branchCategory &&
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
                        </div>
                        <div className="mt-3">
                           <label htmlFor="productName">Skill Category:</label>
                           <select
                              name="skillId"
                              id="skillId"
                              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                 formikBag.errors.skillId &&
                                 formikBag.touched.skillId
                                    ? "bg-yellow"
                                    : ""
                              }`}
                              value={formikBag.values.skillId}
                              onChange={formikBag.handleChange}
                           >
                              {viewData &&
                                 viewData.skillCategory &&
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
                        </div>
                        <div className="mt-3">
                           <label htmlFor="productName">
                              Images:
                              <input
                                 type="file"
                                 name="images"
                                 id="images"
                                 multiple
                                 onChange={(e) => handleChangImage(e)}
                                 className={`ms-5 ${
                                    formikBag.errors.images &&
                                    formikBag.touched.images
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                              />
                           </label>
                           {formikBag.errors.images &&
                              formikBag.touched.images && (
                                 <p className="text-orange-600">
                                    {formikBag.errors.images}
                                 </p>
                              )}
                           {ListImage && (
                              <div className="mt-3">{ListImage()}</div>
                           )}
                        </div>
                        <div className="mt-3 text-base">
                           <label htmlFor="productName">Price:</label>
                           <input
                              type="text"
                              name="price"
                              id="price"
                              placeholder="Enter product's price"
                              value={formikBag.values.price || ""}
                              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
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
                        </div>
                        <div className="text-base mt-3">
                           <label htmlFor="productName">Amount:</label>
                           <input
                              type="text"
                              name="amount"
                              id="amount"
                              placeholder="Enter amount's price"
                              value={formikBag.values.amount || ""}
                              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                 formikBag.errors.amount &&
                                 formikBag.touched.amount
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
                        </div>
                        <div className="text-base mt-3">
                           <label htmlFor="productName">Describes:</label>
                           <textarea
                              name="describes"
                              id="describes"
                              rows={5}
                              value={formikBag.values.describes || ""}
                              placeholder="Enter describe about product"
                              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                 formikBag.errors.describes &&
                                 formikBag.touched.describes
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
                        </div>
                        <div className="flex w-full flex-col mt-auto">
                           <hr className="w-full my-3 h-0.5" />
                           <div className="flex justify-end">
                              <button
                                 type="button"
                                 className="block bg-blue-500 p-2 rounded font-bold"
                                 onClick={handleSubmit}
                              >
                                 Submit
                              </button>
                              <button
                                 type="button"
                                 className="block bg-red-500 p-2 rounded font-bold ms-5"
                                 onClick={handleClose}
                              >
                                 Close
                              </button>
                           </div>
                        </div>
                     </form>
                  </ModalCustom>
               )}
            </div>
            {Pagination.length > 1 && <div className="flex">{Pagination}</div>}
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
               <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                     <tr>
                        <th scope="col" className="px-6 py-3">
                           No
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Product Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Branch
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Age
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Skill
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                           created date
                        </th>
                        <th scope="col" className="px-6 py-3">
                           updated at
                        </th>
                        <th scope="col" className="px-6 py-3">
                           <span className="sr-only">Edit</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {data &&
                        data.products &&
                        data.products.map(
                           (value: ProductType, index: number) => (
                              <tr
                                 key={index}
                                 className="bg-white border-b hover:bg-gray-100 text-black"
                              >
                                 <td className="px-6 py-4">{index + 1}</td>
                                 <td className="px-6 py-4">
                                    {value.productName || ""}
                                 </td>
                                 <td className="px-6 py-4">
                                    {value.branch && value.branch.branchName
                                       ? value.branch.branchName
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4">
                                    {value.age && value.age.ageName
                                       ? value.age.ageName
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4">
                                    {value.skill && value.skill.skillName
                                       ? value.skill.skillName
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4 w-1/6">
                                    <img
                                       style={{
                                          width: "150px",
                                          height: "150px",
                                          objectFit: "cover",
                                       }}
                                       src={
                                          value.images && value.images[0]
                                             ? value.images[0]
                                             : DEFAULT_IMAGE
                                       }
                                       alt={
                                          value.images
                                             ? value.images[0]
                                             : DEFAULT_IMAGE
                                       }
                                    />
                                 </td>
                                 <td className="px-6 py-4">
                                    {formatDate(value.createdAt)}
                                 </td>
                                 <td className="px-6 py-4">
                                    {formatDate(value.updatedAt)}
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <Link
                                       to={`/admin/product-detail/${value._id}`}
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                       Detail
                                    </Link>
                                 </td>
                              </tr>
                           )
                        )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};
