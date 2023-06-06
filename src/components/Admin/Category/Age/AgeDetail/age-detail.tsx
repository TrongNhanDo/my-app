import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { callApi } from "../../../../../api/callApi/callApi";
import { formatDate } from "../../../../Common/Logic/logics";
import { Loader } from "../../../../Common/Loader/loader";
import { validationSchema } from "./validations";
import { AgeType } from "../Common/types";
import { ActionValues } from "../Common/constants";
import { ActionReducerType, FormikBagType, InitState } from "./types";

export const AgeCategoryDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [msg, setMsg] = useState<string>("");

   const reducer = (state: AgeType, action: ActionReducerType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionValues.SELECTED_AGE:
            return payload;
         default:
            return state;
      }
   };

   const [age, dispatch] = useReducer(reducer, InitState);

   const fetchApi = useCallback(async () => {
      const url = `ages/${id}`;
      const response = await callApi(url, "get").catch((err) =>
         console.log({ err })
      );
      dispatch({
         type: ActionValues.SELECTED_AGE,
         payload: response.data || [],
      });
      setIsLoading(false);
   }, [id]);

   const deleteAge = useCallback(
      async (id: string) => {
         if (confirm("Are you sure you want to delete this age category?")) {
            const response = await callApi("ages", "delete", {
               ageId: id,
            }).catch((err) => console.log({ err }));
            if (response) {
               alert("Delete age category success");
               navigate(-1);
            } else {
               alert("Delete age category fail");
            }
         }
      },
      [navigate]
   );

   const onSubmit = useCallback(
      async (formikValues: FormikBagType) => {
         setMsg("");
         if (formikValues.ageName && formikValues.ageName === age.ageName) {
            setMsg("There must be at least one data change");
            return;
         }
         // show loader while update information
         setIsLoading(true);
         const requestPayload = {
            ...formikValues,
            id: id,
         };
         const response = await callApi("ages", "patch", requestPayload).catch(
            (err) => console.log({ err })
         );
         // close loader when updated information
         setIsLoading(false);
         if (response) {
            setMsg("Update account success");
            fetchApi();
         } else {
            setMsg("Age Category Name already existed");
         }
      },
      [age, fetchApi, id]
   );

   const formikBag = useFormik({
      initialValues: {
         ageId: 0,
         ageName: "",
      },
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

   const ErrorMessages = (msg: string) => {
      return (
         <div className="bg-lime-300 w-full text-orange-600 px-5 py-3 rounded-md my-5">
            {msg}
         </div>
      );
   };

   useEffect(() => {
      fetchApi();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (age.ageName && age.ageName !== "") {
         formikBag.setFieldValue("ageName", age.ageName);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [age]);

   return (
      <div>
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <div className="container mt-10">
                  <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10">
                     ACCOUNT DETAIL
                  </h2>
                  {msg && ErrorMessages(msg)}
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
                                    Age ID
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {age.ageId || ""}
                                 </td>
                                 <td className="px-6 py-4">
                                    {age.ageId || ""}
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Age Name
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {age.ageName || ""}
                                 </td>
                                 <td className="px-6 py-4">
                                    <input
                                       type="text"
                                       id="ageName"
                                       name="ageName"
                                       className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                          msg !== "" ||
                                          (formikBag.errors.ageName &&
                                             formikBag.touched.ageName)
                                             ? "bg-yellow"
                                             : ""
                                       }`}
                                       value={formikBag.values.ageName || ""}
                                       onChange={formikBag.handleChange}
                                    />
                                    {formikBag.errors.ageName &&
                                       formikBag.touched.ageName && (
                                          <p className="text-orange-600">
                                             {formikBag.errors.ageName}
                                          </p>
                                       )}
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
                                    {age.createdAt
                                       ? formatDate(age.createdAt)
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    {age.createdAt
                                       ? formatDate(age.createdAt)
                                       : ""}
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Updated At
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {age.updatedAt
                                       ? formatDate(age.updatedAt)
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    {age.updatedAt
                                       ? formatDate(age.updatedAt)
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
                           onClick={() => deleteAge(age._id || "")}
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
