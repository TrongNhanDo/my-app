import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import {
   ActionType,
   ActionTypes,
   InitStateType,
   UserType,
} from "../common/types";
import { callApi } from "../../../../api/callApi/callApi";
import { delay, formatDate, formatRole } from "../../../Common/Logic/logics";
import { Loader } from "../../../Common/Loader/loader";

export const UserList = () => {
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const dataPerPage = useMemo(() => import.meta.env.VITE_PER_PAGE || 10, []);
   const reducer = (state: InitStateType, action: ActionType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionTypes.SET_USERS:
            return {
               ...state,
               users: payload.users || [],
               totalPage: payload.totalPage
                  ? Math.ceil(payload.totalPage / dataPerPage)
                  : 0,
            };
            break;
         default:
            return state;
      }
   };

   const initState = {
      users: [],
      totalPage: 0,
   };

   const [data, dispatch] = useReducer(reducer, initState);

   const fetchApi = useCallback(async () => {
      // get totalPage
      const response = await callApi("users", "get").catch((err) =>
         console.log({ err })
      );
      // get data paginate
      const responsePaginate = await callApi("users/paginate", "post", {
         perPage: dataPerPage,
         page: 1,
      }).catch((err) => console.log({ err }));
      dispatch({
         type: ActionTypes.SET_USERS,
         payload: {
            totalPage: response.data.length || 0,
            users: responsePaginate.data || [],
         },
      });
      await delay(300);
      setShowLoader(false);
   }, [dataPerPage]);

   const [sortUsername, setSortUsername] = useState<number>(1);
   const sortData = useCallback(
      async (column: string) => {
         setShowLoader(true);
         const response = await callApi("users/sort", "post", {
            column: column,
            condition: sortUsername,
         }).catch((err) => console.log({ err }));
         dispatch({
            type: ActionTypes.SET_USERS,
            payload: response.data || [],
         });
         await delay(300);
         setShowLoader(false);
         setSortUsername(sortUsername === 1 ? -1 : 1);
      },
      [sortUsername]
   );

   const changePage = useCallback(async (perPage: number, page: number) => {
      const response = await callApi("users", "get").catch((err) =>
         console.log({ err })
      );
      const responsePaginate = await callApi("users/paginate", "post", {
         perPage: perPage || 10,
         page: page || 1,
      }).catch((err) => console.log({ err }));
      dispatch({
         type: ActionTypes.SET_USERS,
         payload: {
            totalPage: response.data.length || 0,
            users: responsePaginate.data || [],
         },
      });
   }, []);

   const Pagination = () => {
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
   };

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   return (
      <div>
         {showLoader ? (
            <Loader />
         ) : (
            <>
               <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5">
                  LIST OF USER ACCOUNTS
               </h2>
               <div className="flex justify-center mb-2">
                  <Link
                     to="/admin/add-user"
                     type="button"
                     className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                     INSERT NEW ACCOUNT
                  </Link>
               </div>
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 m-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                           <th scope="col" className="px-6 py-3">
                              No
                           </th>
                           <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                 user name
                                 <button onClick={() => sortData("username")}>
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="w-3 h-3 ml-1"
                                       aria-hidden="true"
                                       fill="currentColor"
                                       viewBox="0 0 320 512"
                                    >
                                       <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                 </button>
                              </div>
                           </th>
                           <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                 role
                                 <button onClick={() => sortData("role")}>
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="w-3 h-3 ml-1"
                                       aria-hidden="true"
                                       fill="currentColor"
                                       viewBox="0 0 320 512"
                                    >
                                       <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                 </button>
                              </div>
                           </th>
                           <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                 created date
                                 <button onClick={() => sortData("createdAt")}>
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="w-3 h-3 ml-1"
                                       aria-hidden="true"
                                       fill="currentColor"
                                       viewBox="0 0 320 512"
                                    >
                                       <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                 </button>
                              </div>
                           </th>
                           <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                 updated at
                                 <button onClick={() => sortData("updatedAt")}>
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="w-3 h-3 ml-1"
                                       aria-hidden="true"
                                       fill="currentColor"
                                       viewBox="0 0 320 512"
                                    >
                                       <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                    </svg>
                                 </button>
                              </div>
                           </th>
                           <th scope="col" className="px-6 py-3">
                              <span className="sr-only">Edit</span>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {data &&
                           data.users[0] &&
                           data.users.map((value: UserType, index: number) => (
                              <tr
                                 key={index}
                                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                 <td className="px-6 py-4">{index + 1}</td>
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                 >
                                    {value.username || ""}
                                 </th>
                                 <td className="px-6 py-4">
                                    {formatRole(value.role)}
                                 </td>
                                 <td className="px-6 py-4">
                                    {formatDate(value.createdAt)}
                                 </td>
                                 <td className="px-6 py-4">
                                    {formatDate(value.updatedAt)}
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <Link
                                       to={`/admin/user-detail/${value._id}`}
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                       Detail Account
                                    </Link>
                                 </td>
                              </tr>
                           ))}
                     </tbody>
                  </table>
                  {Pagination && (
                     <div className="flex justify-center my-3">
                        {Pagination()}
                     </div>
                  )}
               </div>
            </>
         )}
      </div>
   );
};
