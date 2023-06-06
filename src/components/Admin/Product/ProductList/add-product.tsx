import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { callApi } from "../../../../api/callApi/callApi";
import { AgeType, BranchType, SkillType } from "../common/types";
import { validationSchema } from "./validations";
import { Loader } from "../../../Common/Loader/loader";
import { FormikBagType, InitFormikValues, StateReducerType } from "./types";

export const AddProduct = () => {
   const navigate = useNavigate();
   const [showLoader, setShowLoader] = useState<boolean>(false);
   const [images, setImages] = useState<File[]>();
   const [viewData, setViewData] = useState<StateReducerType>();

   const fetchApi = useCallback(async () => {
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

   const onSubmit = useCallback(async (formikValues: FormikBagType) => {
      console.log({ formikValues });
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

   const ListImage = () => {
      const buttons = [];
      if (images && images.length) {
         for (let index = 0; index < images.length; index++) {
            buttons.push(
               <img
                  className="w-1/4 mb-3"
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

                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-auto w-2/3">
                     <form onSubmit={formikBag.handleSubmit}>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                           <tbody>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4">
                                    <label htmlFor="productName">
                                       Product Name:
                                    </label>
                                    <input
                                       type="email"
                                       id="productName"
                                       name="productName"
                                       placeholder="Enter product name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base mt-1"
                                       value={
                                          formikBag.values.productName || ""
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
                                 <td className="px-6 py-4">
                                    <label htmlFor="productName">
                                       Age Category:
                                    </label>
                                    <select
                                       id="role"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       value={formikBag.values.ageId}
                                       onChange={formikBag.handleChange}
                                    >
                                       {viewData &&
                                          viewData.ageCategory &&
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
                                 <td className="px-6 py-4">
                                    <label htmlFor="productName">
                                       Branch Category:
                                    </label>
                                    <select
                                       id="role"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       value={formikBag.values.ageId}
                                       onChange={formikBag.handleChange}
                                    >
                                       {viewData &&
                                          viewData.branchCategory &&
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
                                 <td className="px-6 py-4">
                                    <label htmlFor="productName">
                                       Skill Category:
                                    </label>
                                    <select
                                       id="role"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       value={formikBag.values.skillId}
                                       onChange={formikBag.handleChange}
                                    >
                                       {viewData &&
                                          viewData.skillCategory &&
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
                              {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4 w-1/5">
                                    <label htmlFor="productName">
                                       Image 1:{" "}
                                       <input
                                          type="file"
                                          name="image1"
                                          id="image1"
                                          onChange={formikBag.handleChange}
                                       />
                                    </label>
                                    <div className="flex mt-3">
                                       <img
                                          className="w-1/3"
                                          src={
                                             formikBag.values.image1
                                                ? URL.createObjectURL(
                                                     formikBag.values.image1
                                                  )
                                                : ""
                                          }
                                          alt={
                                             formikBag.values.image1
                                                ? URL.createObjectURL(
                                                     formikBag.values.image1
                                                  )
                                                : ""
                                          }
                                       />
                                    </div>
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4 w-1/5">
                                    <label htmlFor="productName">
                                       Image 2:{" "}
                                       <input
                                          type="file"
                                          name="image2"
                                          id="image2"
                                          onChange={formikBag.handleChange}
                                       />
                                    </label>
                                    <div className="flex mt-3">
                                       <img
                                          className="w-1/3"
                                          src={
                                             formikBag.values.image2
                                                ? URL.createObjectURL(
                                                     formikBag.values.image2
                                                  )
                                                : ""
                                          }
                                          alt={
                                             formikBag.values.image2
                                                ? URL.createObjectURL(
                                                     formikBag.values.image2
                                                  )
                                                : ""
                                          }
                                       />
                                    </div>
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4 w-1/5">
                                    <label htmlFor="productName">
                                       Image 3:{" "}
                                       <input
                                          type="file"
                                          name="image3"
                                          id="image3"
                                          onChange={formikBag.handleChange}
                                       />
                                    </label>
                                    <div className="flex mt-3">
                                       <img
                                          className="w-1/3"
                                          src={
                                             formikBag.values.image3
                                                ? URL.createObjectURL(
                                                     formikBag.values.image3
                                                  )
                                                : ""
                                          }
                                          alt={
                                             formikBag.values.image3
                                                ? URL.createObjectURL(
                                                     formikBag.values.image3
                                                  )
                                                : ""
                                          }
                                       />
                                    </div>
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4 w-1/5">
                                    <label htmlFor="productName">
                                       Image 4:{" "}
                                       <input
                                          type="file"
                                          name="image4"
                                          id="image4"
                                          onChange={formikBag.handleChange}
                                       />
                                    </label>
                                    <div className="flex mt-3">
                                       <img
                                          className="w-1/3"
                                          src={
                                             formikBag.values.image4
                                                ? URL.createObjectURL(
                                                     formikBag.values.image4
                                                  )
                                                : ""
                                          }
                                          alt={
                                             formikBag.values.image4
                                                ? URL.createObjectURL(
                                                     formikBag.values.image4
                                                  )
                                                : ""
                                          }
                                       />
                                    </div>
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4 w-1/5">
                                    <label htmlFor="productName">
                                       Image 5:{" "}
                                       <input
                                          type="file"
                                          name="image5"
                                          id="image5"
                                          onChange={formikBag.handleChange}
                                       />
                                    </label>
                                    <div className="flex mt-3">
                                       <img
                                          className="w-1/3"
                                          src={
                                             formikBag.values.image5
                                                ? URL.createObjectURL(
                                                     formikBag.values.image5
                                                  )
                                                : ""
                                          }
                                          alt={
                                             formikBag.values.image5
                                                ? URL.createObjectURL(
                                                     formikBag.values.image5
                                                  )
                                                : ""
                                          }
                                       />
                                    </div>
                                 </td>
                              </tr> */}

                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4 text-base">
                                    <label htmlFor="productName">Price:</label>
                                    <input
                                       id="file"
                                       name="profile"
                                       type="file"
                                       onChange={(event) => {
                                          const files = event.target.files;
                                          const myFiles = files
                                             ? Array.from(files)
                                             : [];
                                          formikBag.setFieldValue(
                                             "profile",
                                             myFiles
                                          );
                                          setImages(myFiles);
                                       }}
                                       multiple
                                    />
                                    {ListImage && ListImage()}
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4 text-base">
                                    <label htmlFor="productName">Price:</label>
                                    <input
                                       type="text"
                                       name="price"
                                       id="price"
                                       placeholder="Enter product's price"
                                       value={formikBag.values.price || ""}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       onChange={formikBag.handleChange}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4 text-base">
                                    <label htmlFor="productName">Amount:</label>
                                    <input
                                       type="text"
                                       name="amount"
                                       id="amount"
                                       placeholder="Enter amount's price"
                                       value={formikBag.values.amount || ""}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       onChange={formikBag.handleChange}
                                    />
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <td className="px-6 py-4 text-base">
                                    <label htmlFor="productName">
                                       Describes:
                                    </label>
                                    <textarea
                                       name="describes"
                                       id="describes"
                                       value={formikBag.values.describes || ""}
                                       placeholder="Enter describe about product"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       onChange={formikBag.handleChange}
                                    />
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
