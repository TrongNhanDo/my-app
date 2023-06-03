import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../../Common/Loader/loader";
import {
   ActionType,
   ActionValues,
   ProductListType,
   ProductType,
} from "../common/types";
import { delay, formatDate } from "../../../Common/Logic/logics";
import { callApi } from "../../../../api/callApi/callApi";

export const ProductList = () => {
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const reducer = (state: ProductListType, action: ActionType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionValues.GET_PRODUCTS:
            return {
               ...state,
               products: payload,
            };
         default:
            return state;
      }
   };

   const initState = { products: [] };
   const [data, dispatch] = useReducer(reducer, initState);

   const fetchApi = async () => {
      const response = await callApi("products", "get").catch((err) =>
         console.log({ err })
      );
      dispatch({
         type: ActionValues.GET_PRODUCTS,
         payload: response.data || [],
      });
      await delay(300);
      setShowLoader(false);
   };

   useEffect(() => {
      fetchApi();
   }, []);

   return (
      <div className="mb-10">
         {showLoader ? (
            <Loader />
         ) : (
            <>
               <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5">
                  LIST OF PRODUCTS
               </h2>
               <div className="flex justify-center mb-2">
                  <Link
                     to="/admin/add-user"
                     type="button"
                     className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                     INSERT NEW PRODUCT
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
                              Product Name
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Branch
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Age
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Skill
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Image
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
                           data.products[0] &&
                           data.products.map(
                              (value: ProductType, index: number) => (
                                 <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                 >
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <th
                                       scope="row"
                                       className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                       {value.productName || ""}
                                    </th>
                                    <td className="px-6 py-4">
                                       {value.branch.branchName || ""}
                                    </td>
                                    <td className="px-6 py-4">
                                       {value.age.ageName || ""}
                                    </td>
                                    <td className="px-6 py-4">
                                       {value.skill.skillName || ""}
                                    </td>
                                    <td className="px-6 py-4 w-1/6">
                                       <img
                                          className="w-full h-auto"
                                          src={value.image1 || ""}
                                          alt={value.image1 || ""}
                                       />
                                    </td>
                                    <td className="px-6 py-4">
                                       {formatDate(value.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                       {formatDate(value.updatedAt)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                       <Link
                                          to={`/admin/product-detail/${value._id}`}
                                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                       >
                                          Detail Account
                                       </Link>
                                    </td>
                                 </tr>
                              )
                           )}
                     </tbody>
                  </table>
               </div>
            </>
         )}
      </div>
   );
};
