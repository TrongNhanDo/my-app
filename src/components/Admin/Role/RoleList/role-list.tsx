import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { InitReducer, InputActionType, RoleType } from "../Common/types";
import { ActionValues } from "../Common/constants";
import { callApi } from "../../../../api/callApi/callApi";
import { Loader } from "../../../Common/Loader/loader";
import { formatDate } from "../../../Common/Logic/logics";

export const RoleList = () => {
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const dataPerPage = useMemo(
      () => parseInt(import.meta.env.VITE_PER_PAGE || 10),
      []
   );
   const reducer = (state: InitReducer, action: InputActionType) => {
      const { type, payload } = action;
      const sumPage =
         payload && payload.totalPage
            ? Math.ceil(payload.totalPage / dataPerPage)
            : 0;
      switch (type) {
         case ActionValues.SET_ROLES:
            return {
               ...state,
               roles: payload && payload.roles ? payload.roles : [],
               totalPage: sumPage,
            };
         default:
            return state;
      }
   };

   const initState = { roles: [], totalPage: 0 };
   const [data, dispatch] = useReducer(reducer, initState);
   const fetchApi = useCallback(async () => {
      // get totalPage
      const response = await callApi("roles", "get").catch((err) =>
         console.log({ err })
      );
      // get data paginate
      const responsePaginate = await callApi("roles/paginate", "post", {
         perPage: dataPerPage,
         page: 1,
      }).catch((err) => console.log({ err }));
      dispatch({
         type: ActionValues.SET_ROLES,
         payload: {
            totalPage: response.data.length || 0,
            roles: responsePaginate.data || [],
         },
      });
      setShowLoader(false);
   }, [dataPerPage]);

   const changePage = useCallback(async (perPage: number, page: number) => {
      setShowLoader(true);
      const response = await callApi("ages", "get").catch((err) =>
         console.log({ err })
      );
      const responsePaginate = await callApi("ages/paginate", "post", {
         perPage: perPage || 10,
         page: page || 1,
      }).catch((err) => console.log({ err }));
      dispatch({
         type: ActionValues.SET_ROLES,
         payload: {
            totalPage: response.data.length || 0,
            roles: responsePaginate.data || [],
         },
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

   return (
      <div className="container mb-10">
         {showLoader && <Loader />}
         <div>
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5">
               LIST OF AGE CATEGORIES
            </h2>
            <div className="flex justify-center mb-2">
               <Link
                  to="/admin/add-role"
                  type="button"
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
               >
                  INSERT NEW ROLE
               </Link>
            </div>
            {Pagination.length > 1 && <div className="flex">{Pagination}</div>}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
               <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                     <tr>
                        <th scope="col" className="px-6 py-3">
                           no
                        </th>
                        <th scope="col" className="px-6 py-3">
                           role id
                        </th>
                        <th scope="col" className="px-6 py-3">
                           role Name
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
                        data.roles &&
                        data.roles.map((value: RoleType, index: number) => (
                           <tr
                              key={index}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                           >
                              <td className="px-6 py-4">{index + 1}</td>
                              <th
                                 scope="row"
                                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                 {value.roleId || ""}
                              </th>
                              <td className="px-6 py-4">
                                 {value.roleName || ""}
                              </td>
                              <td className="px-6 py-4">
                                 {formatDate(value.createdAt)}
                              </td>
                              <td className="px-6 py-4">
                                 {formatDate(value.updatedAt)}
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <Link
                                    to={`/admin/role-detail/${value._id}`}
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
};
