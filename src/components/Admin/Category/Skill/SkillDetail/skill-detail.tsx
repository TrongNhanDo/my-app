import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
   ActionReducerType,
   FormikBagType,
   InitStateReducerType,
   StateReducerType,
} from "./types";
import { ActionValues } from "../Common/types";
import { callApi } from "../../../../../api/callApi/callApi";
import { useFormik } from "formik";
import { validationSchema } from "./vadidations";
import { Loader } from "../../../../Common/Loader/loader";
import { formatDate } from "../../../../Common/Logic/logics";

export const SkillCategoryDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [msg, setMsg] = useState<string>("");

   const reducer = (state: StateReducerType, action: ActionReducerType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionValues.GET_SKILL:
            return {
               skill: payload,
            };
         default:
            return state;
      }
   };

   const [data, dispatch] = useReducer(reducer, InitStateReducerType);

   const fetchApi = useCallback(async () => {
      const url = `skills/${id}`;
      const response = await callApi(url, "get").catch((err) =>
         console.log({ err })
      );
      dispatch({
         type: ActionValues.GET_SKILL,
         payload: response.data || [],
      });
      setIsLoading(false);
   }, [id]);

   const deleteAge = useCallback(
      async (id: string) => {
         if (confirm("Are you sure you want to delete this skill category?")) {
            const response = await callApi("skills", "delete", {
               id: id,
            }).catch((err) => console.log({ err }));
            if (response) {
               alert("Delete branch category success");
               navigate(-1);
            } else {
               alert("Delete branch category fail");
            }
         }
      },
      [navigate]
   );

   const onSubmit = useCallback(
      async (formikValues: FormikBagType) => {
         setMsg("");
         if (
            formikValues.skillName &&
            data.skill &&
            formikValues.skillName === data.skill.skillName
         ) {
            setMsg("There must be at least one data change");
         } else {
            // show loader while update information
            setIsLoading(true);
            const requestPayload = {
               ...formikValues,
               id: id,
            };
            const response = await callApi(
               "skills",
               "patch",
               requestPayload
            ).catch((err) => console.log({ err }));
            // close loader when updated information
            setIsLoading(false);
            if (response) {
               setMsg("Update category success");
               fetchApi();
            } else {
               setMsg("Skill Category Name already existed");
            }
         }
      },
      [data, fetchApi, id]
   );

   const formikBag = useFormik({
      initialValues: {
         skillName: "",
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
      if (data.skill && data.skill.skillName !== "") {
         formikBag.setFieldValue("skillName", data.skill.skillName);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data]);

   return (
      <div>
         {isLoading && <Loader />}
         <div className="container mt-10">
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10">
               BRANCH CATEGORY DETAIL
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
                              Skill ID
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.skill ? data.skill.skillId : ""}
                           </td>
                           <td className="px-6 py-4">
                              {data.skill ? data.skill.skillId : ""}
                           </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                           <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                           >
                              Skill Name
                           </th>
                           <td className="px-6 py-4 text-base">
                              {data.skill ? data.skill.skillName : ""}
                           </td>
                           <td className="px-6 py-4">
                              <input
                                 type="text"
                                 id="skillName"
                                 name="skillName"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base ${
                                    msg !== "" ||
                                    (formikBag.errors.skillName &&
                                       formikBag.touched.skillName)
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 value={formikBag.values.skillName || ""}
                                 onChange={formikBag.handleChange}
                              />
                              {formikBag.errors.skillName &&
                                 formikBag.touched.skillName && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.skillName}
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
                              {data.skill && data.skill.createdAt
                                 ? formatDate(data.skill.createdAt)
                                 : ""}
                           </td>
                           <td className="px-6 py-4 text-base">
                              {data.skill && data.skill.createdAt
                                 ? formatDate(data.skill.createdAt)
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
                              {data.skill && data.skill.updatedAt
                                 ? formatDate(data.skill.updatedAt)
                                 : ""}
                           </td>
                           <td className="px-6 py-4 text-base">
                              {data.skill && data.skill.updatedAt
                                 ? formatDate(data.skill.updatedAt)
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
                     onClick={() => deleteAge(data.skill ? data.skill._id : "")}
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
