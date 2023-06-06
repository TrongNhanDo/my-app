import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../../Common/Loader/loader";
import { ActionValues, ProductType } from "../common/types";
import { formatDate } from "../../../Common/Logic/logics";
import { callApi } from "../../../../api/callApi/callApi";
import { ActionReducerType, ProductListType } from "./types";

export const ProductList = () => {
   const [showLoader, setShowLoader] = useState<boolean>(true);
   const dataPerpage = parseInt(import.meta.env.VITE_PER_PAGE || 10);
   const reducer = (state: ProductListType, action: ActionReducerType) => {
      const { type, payload } = action;
      switch (type) {
         case ActionValues.GET_PRODUCTS:
            return {
               ...state,
               products: payload && payload.products ? payload.products : [],
               totalPage: payload && payload.totalPage ? payload.totalPage : 0,
            };
         default:
            return state;
      }
   };

   const initState = { products: [], totalPage: 0 };
   const [data, dispatch] = useReducer(reducer, initState);

   const fetchApi = useCallback(async () => {
      const responseAll = await callApi("products", "get").catch((err) =>
         console.log({ err })
      );
      const responsePaginate = await callApi("products/paginate", "post", {
         perPage: dataPerpage,
         page: 1,
      });
      dispatch({
         type: ActionValues.GET_PRODUCTS,
         payload: {
            products: responsePaginate.data || [],
            totalPage: responseAll.data
               ? Math.ceil(responseAll.data.length / dataPerpage)
               : 0,
         },
      });
      setShowLoader(false);
   }, [dataPerpage]);

   const changePage = useCallback(
      async (perPage: number, page: number) => {
         setShowLoader(true);
         const response = await callApi("products", "get").catch((err) =>
            console.log({ err })
         );
         const responsePaginate = await callApi("products/paginate", "post", {
            perPage: perPage || 10,
            page: page || 1,
         }).catch((err) => console.log({ err }));
         dispatch({
            type: ActionValues.GET_PRODUCTS,
            payload: {
               totalPage: response.data
                  ? Math.ceil(response.data.length / dataPerpage)
                  : 0,
               products: responsePaginate.data || [],
            },
         });
         setShowLoader(false);
      },
      [dataPerpage]
   );

   const Pagination = useMemo(() => {
      const buttons = [];
      for (let index = 1; index <= data.totalPage; index++) {
         buttons.push(
            <button
               key={index}
               type="button"
               className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
               onClick={() => changePage(dataPerpage, index)}
            >
               {index}
            </button>
         );
      }
      return buttons.length > 0 ? buttons : [];
   }, [changePage, data, dataPerpage]);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   return (
      <div className="container mb-10">
         {showLoader && <Loader />}
         <div>
            <h2 className="text-4xl font-extrabold text-current my-3 text-center mt-10 mb-5">
               LIST OF PRODUCTS
            </h2>
            <div className="flex justify-center mb-2">
               <Link
                  to="/admin/add-product"
                  type="button"
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
               >
                  INSERT NEW PRODUCT
               </Link>
            </div>
            {Pagination.length > 1 && <div className="flex">{Pagination}</div>}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        data.products &&
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
         </div>
      </div>
   );
};