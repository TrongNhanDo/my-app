import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { callApi } from "../../../../../api/callApi/callApi";
import { formatDate, scrollTop } from "../../../../Common/Logic/logics";
import { Loader } from "../../../../Common/Loader/loader";
import { validationSchema } from "./validations";
import { ActionValues } from "../Common/constants";
import {
   ActionReducerType,
   FormikBagType,
   InitStateReducerType,
   StateReducerType,
} from "./types";
import { ErrorMessages } from "../../../../Common/ErrorMessage/error-message";

export const AgeCategoryDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [msg, setMsg] = useState<string>("");

   const reducer = (state: StateReducerType, action: ActionReducerType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionValues.SELECTED_AGE:
            return {
               age: payload,
            };
         default:
            return state;
      }
   };

   const [data, dispatch] = useReducer(reducer, InitStateReducerType);

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
            setIsLoading(true);
            const response = await callApi("ages", "delete", {
               id: id,
            }).catch((err) => console.log({ err }));
            setIsLoading(false);
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

   const onSubmit = async (formikValues: FormikBagType) => {
      setMsg("");
      if (
         formikValues.ageName &&
         data.age &&
         formikValues.ageName === data.age.ageName
      ) {
         setMsg("There must be at least one data change");
      } else {
         // show loader while update information
         setIsLoading(true);
         const requestPayload = {
            ...formikValues,
            id: id,
         };
         const response = await callApi("ages", "patch", requestPayload).catch(
            (err) => setMsg(err.response.data.message || "")
         );
         // close loader when updated information
         setIsLoading(false);
         if (response) {
            setMsg("Update age category success");
            fetchApi();
         }
      }
      scrollTop();
   };

   const formikBag = useFormik({
      initialValues: {
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

   useEffect(() => {
      fetchApi();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (data.age && data.age.ageName !== "") {
         formikBag.setFieldValue("ageName", data.age.ageName);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data]);

   return (
      <div>
         {isLoading && <Loader />}
         <div className="div-contai mt-10">
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10">
               ACCOUNT DETAIL
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
                              Age ID
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.age ? data.age.ageId : ""}
                           </td>
                           <td className="px-6 py-4">
                              {data.age ? data.age.ageId : ""}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                           >
                              Age Name
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.age ? data.age.ageName : ""}
                           </td>
                           <td className="px-6 py-4">
                              <input
                                 type="text"
                                 id="ageName"
                                 name="ageName"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                    formikBag.errors.ageName &&
                                    formikBag.touched.ageName
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
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                           >
                              Created Date
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.age && data.age.createdAt
                                 ? formatDate(data.age.createdAt)
                                 : ""}
                           </td>
                           <td className="px-6 py-4 text-base">
                              {data.age && data.age.createdAt
                                 ? formatDate(data.age.createdAt)
                                 : ""}
                           </td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-100 text-black">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                           >
                              Updated At
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.age && data.age.updatedAt
                                 ? formatDate(data.age.updatedAt)
                                 : ""}
                           </td>
                           <td className="px-6 py-4 text-base">
                              {data.age && data.age.updatedAt
                                 ? formatDate(data.age.updatedAt)
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
                     onClick={() => deleteAge(data.age ? data.age._id : "")}
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
      </div>
   );
};
