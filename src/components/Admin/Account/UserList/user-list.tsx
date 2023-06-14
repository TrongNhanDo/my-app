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
   ActionType,
   ActionTypes,
   InitStateType,
   InputInsertType,
   RoleType,
   UserType,
} from "../common/types";
import { callApi } from "../../../../api/callApi/callApi";
import { formatDate } from "../../../Common/Logic/logics";
import Loader from "../../../Common/Loader/loader";
import { validationSchema } from "./validations";
import { ModalCustom } from "../../../Common/Modal/modal-custom";
import { Input } from "../../../Common/Input/input";

const UserList = React.memo(() => {
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const dataPerPage = parseInt(import.meta.env.VITE_PER_PAGE || 10);
   const [success, setSuccess] = useState<boolean>(false);
   const [error, setError] = useState<string>("");
   const [modal, setModal] = useState<boolean>(false);
   const [roleValues, setRoleValues] = useState<RoleType[]>([]);

   const fetchRole = useCallback(async () => {
      const response = await callApi("roles", "get").catch((err) =>
         console.log({ err })
      );
      setRoleValues(response.data ? response.data : []);
      setShowLoader(false);
   }, []);

   useEffect(() => {
      fetchRole();
   }, [fetchRole]);

   const reducer = (state: InitStateType, action: ActionType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionTypes.SET_USERS:
            return {
               ...payload,
            };
            break;
         default:
            return state;
      }
   };

   const initState = {
      count: 0,
      returnCnt: 0,
      totalPage: 0,
      users: [],
   };

   const [data, dispatch] = useReducer(reducer, initState);

   const fetchApi = useCallback(async () => {
      const response = await callApi("users/paginate", "post", {
         perPage: dataPerPage,
         page: 1,
      }).catch((err) => console.log({ err }));
      const data: InitStateType = response.data || null;
      dispatch({
         type: ActionTypes.SET_USERS,
         payload: data,
      });
      setShowLoader(false);
   }, [dataPerPage]);

   const changePage = useCallback(async (perPage: number, page: number) => {
      setShowLoader(true);
      const response = await callApi("users/paginate", "post", {
         perPage: perPage || 10,
         page: page || 1,
      }).catch((err) => console.log({ err }));
      const data: InitStateType = response.data || null;
      dispatch({
         type: ActionTypes.SET_USERS,
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

   const onSubmit = async (formikValues: InputInsertType) => {
      setSuccess(false);
      if (
         formikValues.password &&
         formikValues.confirmPwd &&
         formikValues.password !== formikValues.confirmPwd
      ) {
         formikBag.setFieldError(
            "confirmPwd",
            "Confirm password not matched with password"
         );
      } else {
         setShowLoader(true);
         const requestPayload = {
            ...formikValues,
            username: formikValues.username.trim(),
            password: formikValues.password.trim(),
         };
         await callApi("users", "post", requestPayload)
            .then(() => {
               setError("Insert new account success");
               setSuccess(true);
            })
            .catch((err) => {
               setError(err.response.data.message || "");
            });
         setShowLoader(false);
      }
   };

   const formikBag = useFormik({
      initialValues: {
         username: "",
         password: "",
         confirmPwd: "",
         roleId: 1,
      },
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
      if (modal) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }
   }, [modal]);

   useEffect(() => {
      if (success) {
         formikBag.resetForm();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [success]);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   return (
      <div>
         {showLoader && <Loader />}
         <div className="div-contai m-auto">
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5">
               LIST OF USER ACCOUNTS
            </h2>
            <div className="flex justify-center mb-2">
               <button
                  type="button"
                  className="block bg-blue-300 hover:bg-blue-400 hover:bg-blue-400 px-3 py-2 rounded"
                  onClick={() => setModal(true)}
               >
                  INSERT NEW ACCOUNT
               </button>
               {modal && (
                  <ModalCustom>
                     <form onSubmit={formikBag.handleSubmit} className="w-96">
                        <div className="flex w-full justify-between text-2xl font-bold">
                           <div className="uppercase">add new account</div>
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
                                 label="Username:"
                                 name="username"
                                 id="username"
                                 type="text"
                                 className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 ${
                                    formikBag.errors.username &&
                                    formikBag.touched.username
                                       ? "bg-yellow"
                                       : ""
                                 }`}
                                 onChange={formikBag.handleChange}
                                 value={formikBag.values.username || ""}
                              />
                              {formikBag.errors.username &&
                                 formikBag.touched.username && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.username}
                                    </p>
                                 )}
                           </div>
                           <div className="mb-6">
                              <Input
                                 label="Password:"
                                 name="password"
                                 id="password"
                                 type="password"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 onChange={formikBag.handleChange}
                                 value={formikBag.values.password || ""}
                              />
                              {formikBag.errors.password &&
                                 formikBag.touched.password && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.password}
                                    </p>
                                 )}
                           </div>
                           <div className="mb-6">
                              <Input
                                 label="Confirm Password:"
                                 name="confirmPwd"
                                 id="confirmPwd"
                                 type="password"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 onChange={formikBag.handleChange}
                                 value={formikBag.values.confirmPwd || ""}
                              />
                              {formikBag.errors.confirmPwd &&
                                 formikBag.touched.confirmPwd && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.confirmPwd}
                                    </p>
                                 )}
                           </div>
                           <div className="mb-6">
                              <label htmlFor="roleId">Role:</label>
                              <select
                                 id="roleId"
                                 name="roleId"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                 onChange={formikBag.handleChange}
                                 value={formikBag.values.roleId}
                              >
                                 {roleValues &&
                                    roleValues.map((value, index) => (
                                       <option key={index} value={value.roleId}>
                                          {value.roleName}
                                       </option>
                                    ))}
                              </select>
                              {formikBag.errors.roleId &&
                                 formikBag.touched.roleId && (
                                    <p className="text-orange-600">
                                       {formikBag.errors.roleId}
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
            <div className="overflow-x-auto shadow-md sm:rounded-lg  m-auto">
               <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                     <tr>
                        <th scope="col" className="px-6 py-3">
                           No
                        </th>
                        <th scope="col" className="px-6 py-3">
                           user name
                        </th>
                        <th scope="col" className="px-6 py-3">
                           role
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
                        data.users &&
                        data.users.map((value: UserType, index: number) => (
                           <tr
                              key={index}
                              className="bg-white border-b hover:bg-gray-100 text-black"
                           >
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4">
                                 {value.username || ""}
                              </td>
                              <td className="px-6 py-4">
                                 {value.role && value.role.roleName
                                    ? value.role.roleName
                                    : ""}
                              </td>
                              <td className="px-6 py-4">
                                 {value.createdAt
                                    ? formatDate(value.createdAt)
                                    : ""}
                              </td>
                              <td className="px-6 py-4">
                                 {value.createdAt
                                    ? formatDate(value.updatedAt)
                                    : ""}
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <Link
                                    to={`/admin/user-detail/${value._id || ""}`}
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

export default UserList;
