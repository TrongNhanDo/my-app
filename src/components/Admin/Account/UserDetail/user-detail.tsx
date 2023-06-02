import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { callApi } from "../../../../api/callApi/callApi";
import {
   ActionType,
   ActionTypes,
   FormikPropType,
   InitStateUserDetailType,
} from "../common/types";
import { formatDate, formatRole } from "../../../Common/Logic/logics";
import { RoleNumber } from "../common/constants";
import { Loader } from "../../../Common/Loader/loader";
import { validationSchema } from "./validations";

export const UserDetail = () => {
   const { userId } = useParams();
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(true);

   const initState = {
      product: {
         active: false,
         createdAt: "",
         role: 0,
         updatedAt: "",
         username: "",
         __v: 0,
         _id: "",
      },
   };

   const reducer = (state: InitStateUserDetailType, action: ActionType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionTypes.SELECTED_PRODUCT:
            return payload;
         default:
            return state;
      }
   };

   const [product, dispatch] = useReducer(reducer, initState);

   const fetchApi = async () => {
      const url = `users/${userId}`;
      const response = await callApi(url, "get").catch((err) =>
         console.log({ err })
      );
      dispatch({
         type: ActionTypes.SELECTED_PRODUCT,
         payload: response.data || [],
      });
      setIsLoading(false);
   };

   const deleteUser = useCallback(
      async (userId: string) => {
         const response = await callApi("users", "delete", {
            id: userId,
         }).catch((err) => console.log({ err }));
         if (response) {
            alert("Delete account success");
            navigate(-1);
         } else {
            alert("Delete account fail");
         }
      },
      [navigate]
   );

   const onSubmit = async (formikValues: FormikPropType) => {
      // show loader while update information
      setIsLoading(true);
      const requestPayload = {
         ...formikValues,
         id: userId,
      };
      const response = await callApi("users", "patch", requestPayload).catch(
         (err) => console.log({ err })
      );
      // close loader when updated information
      setIsLoading(false);
      if (response) {
         alert("Update account success");
         fetchApi();
      } else {
         alert("Update account fail");
      }
   };

   const formikBag = useFormik({
      initialValues: {
         username: "",
         role: 1,
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
      if (!isLoading) {
         formikBag.setFieldValue("username", product.username || "");
         formikBag.setFieldValue("role", product.role || 1);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLoading, product]);

   return (
      <div>
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <div className="mt-10 w-3/4 m-auto">
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
                                    Username
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {product.username || ""}
                                 </td>
                                 <td className="px-6 py-4">
                                    <input
                                       type="email"
                                       id="username"
                                       name="username"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       value={formikBag.values.username || ""}
                                       onChange={formikBag.handleChange}
                                    />
                                    {formikBag.errors.username &&
                                       formikBag.touched.username && (
                                          <p className="text-orange-600">
                                             {formikBag.errors.username}
                                          </p>
                                       )}
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Roles
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {product.role
                                       ? formatRole(product.role)
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4">
                                    <select
                                       id="role"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-base"
                                       onChange={formikBag.handleChange}
                                       value={formikBag.values.role}
                                    >
                                       <option value={RoleNumber.User}>
                                          User
                                       </option>
                                       <option value={RoleNumber.Employee}>
                                          Employee
                                       </option>
                                       <option value={RoleNumber.Admin}>
                                          Admin
                                       </option>
                                    </select>
                                 </td>
                              </tr>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    Active
                                 </th>
                                 <td className="px-6 py-4 text-base">
                                    {product.active ? "Active" : "Inactive"}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    {product.active ? "Active" : "Inactive"}
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
                                    {product.createdAt
                                       ? formatDate(product.createdAt)
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    {product.createdAt
                                       ? formatDate(product.createdAt)
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
                                    {product.updatedAt
                                       ? formatDate(product.updatedAt)
                                       : ""}
                                 </td>
                                 <td className="px-6 py-4 text-base">
                                    {product.updatedAt
                                       ? formatDate(product.updatedAt)
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
                           className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 px-20"
                           onClick={handleSubmit}
                        >
                           Update
                        </button>
                        <button
                           type="button"
                           className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ms-10 px-20"
                           onClick={() => deleteUser(product._id || "")}
                        >
                           Delete
                        </button>
                        <button
                           type="button"
                           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 px-20 ms-10"
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
