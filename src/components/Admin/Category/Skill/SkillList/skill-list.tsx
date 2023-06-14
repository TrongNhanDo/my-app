import React, {
   useCallback,
   useEffect,
   useMemo,
   useReducer,
   useState,
} from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {
   ActionReducerType,
   FormikBagType,
   InitFormikBag,
   InitStateReducerType,
   StateReducerType,
} from "./types";
import { ActionValues, SkillType } from "../Common/types";
import { callApi } from "../../../../../api/callApi/callApi";
import Loader from "../../../../Common/Loader/loader";
import { formatDate } from "../../../../Common/Logic/logics";
import { ModalCustom } from "../../../../Common/Modal/modal-custom";
import { validationSchema } from "./validations";
import { Input } from "../../../../Common/Input/input";

const SkillList = React.memo(() => {
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const dataPerPage = parseInt(import.meta.env.VITE_PER_PAGE || 10);
   const [error, setError] = useState<string>("");
   const [success, setSuccess] = useState<boolean>(false);
   const [modal, setModal] = useState<boolean>(false);

   const reducer = (state: StateReducerType, action: ActionReducerType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionValues.SET_SKILLS:
            return {
               ...payload,
            };
         default:
            return state;
      }
   };

   const [data, dispatch] = useReducer(reducer, InitStateReducerType);
   const fetchApi = useCallback(async () => {
      const response = await callApi("skills/paginate", "post", {
         perPage: dataPerPage,
         page: 1,
      }).catch((err) => console.log({ err }));
      const data: StateReducerType = response.data || null;
      dispatch({
         type: ActionValues.SET_SKILLS,
         payload: data,
      });
      setShowLoader(false);
   }, [dataPerPage]);

   const changePage = useCallback(async (perPage: number, page: number) => {
      setShowLoader(true);
      const response = await callApi("skills/paginate", "post", {
         perPage: perPage || 10,
         page: page || 1,
      }).catch((err) => console.log({ err }));
      const data: StateReducerType = response.data || null;
      dispatch({
         type: ActionValues.SET_SKILLS,
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
               onClick={() => changePage(dataPerPage, index)}
            >
               {index}
            </button>
         );
      }
      return buttons.length > 0 ? buttons : [];
   }, [changePage, data, dataPerPage]);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   const onSubmit = useCallback(
      async (formikValues: FormikBagType) => {
         setSuccess(false);
         setShowLoader(true);
         const requestPayload = {
            ...formikValues,
            skillName: formikValues.skillName.trim(),
         };
         await callApi("skills", "post", requestPayload)
            .then(() => {
               setError("Insert new skill success");
               setSuccess(true);
            })
            .catch((err) => {
               setError(err.response.data.message);
            });
         await fetchApi();
         setShowLoader(false);
      },
      [fetchApi]
   );

   const formikBag = useFormik({
      initialValues: InitFormikBag,
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
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5 uppercase">
               list of skill categories
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
                     <form onSubmit={formikBag.handleSubmit} className="w-96">
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
                        <div className="flex flex-col w-full">
                           <div className="mb-6">
                              <Input
                                 label="Skill Id:"
                                 name="skillId"
                                 id="skillId"
                                 type="text"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 ${
                                    formikBag.errors.skillId &&
                                    formikBag.touched.skillId
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 onChange={formikBag.handleChange}
                                 value={formikBag.values.skillId || ""}
                              />
                              {formikBag.errors.skillId &&
                                 formikBag.touched.skillId && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.skillId}
                                    </p>
                                 )}
                           </div>
                           <div className="mb-6">
                              <Input
                                 type="text"
                                 label="Skill Name:"
                                 name="skillName"
                                 id="skillName"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 ${
                                    formikBag.errors.skillName &&
                                    formikBag.touched.skillName
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 onChange={formikBag.handleChange}
                                 value={formikBag.values.skillName || ""}
                              />
                              {formikBag.errors.skillName &&
                                 formikBag.touched.skillName && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.skillName}
                                    </p>
                                 )}
                           </div>
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
                           no
                        </th>
                        <th scope="col" className="px-6 py-3">
                           skill id
                        </th>
                        <th scope="col" className="px-6 py-3">
                           skill Name
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
                        data.skills &&
                        data.skills.map((value: SkillType, index: number) => (
                           <tr
                              key={index}
                              className="bg-white border-b hover:bg-gray-100 text-black"
                           >
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4">
                                 {value.skillId || ""}
                              </td>
                              <td className="px-6 py-4">
                                 {value.skillName || ""}
                              </td>
                              <td className="px-6 py-4">
                                 {formatDate(value.createdAt)}
                              </td>
                              <td className="px-6 py-4">
                                 {formatDate(value.updatedAt)}
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <Link
                                    to={`/admin/skill-category-detail/${value._id}`}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                 >
                                    Detail
                                 </Link>
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
});

export default SkillList;
