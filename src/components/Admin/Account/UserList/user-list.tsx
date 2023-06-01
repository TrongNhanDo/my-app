import { ActionType, ActionTypes, InitStateType, UserType } from "../common/types";
import { useEffect, useReducer } from "react";
import { callApi } from "../../../../api/callApi/callApi";
import { Link } from "react-router-dom";
import { formatDate, formatRole } from "../common/logics";

export const UserList = () => {
   const reducer = (state: InitStateType, action: ActionType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionTypes.SET_PRODUCTS:
            return {
               ...state,
               products: payload,
            };
            break;
         default:
            return state;
      }
   };

   const initState = {
      products: [],
   };

   const [data, dispatch] = useReducer(reducer, initState);
   const fetchApi = async () => {
      const response = await callApi('users', 'get').catch(err => console.log({ err }));
      dispatch({
         type: ActionTypes.SET_PRODUCTS,
         payload: response.data || [],
      });
   };

   useEffect(() => {
      fetchApi();
   }, []);

   return (
      <div>
         <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5">
            LIST OF USER ACCOUNTS
         </h2>
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 m-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  {data && data.products[0] && data.products.map((value: UserType, index: number) => (
                     <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                           {index + 1}
                        </td>
                        <th
                           scope="row"
                           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                           {value.username || ''}
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
         </div>

      </div >
   );
};
