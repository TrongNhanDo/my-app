import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateReducerType } from "./types";
import { callApi } from "../../../api/callApi/callApi";
import { Loader } from "../../Common/Loader/loader";

export const AdminHome = () => {
   const [data, setData] = useState<StateReducerType>();
   const [showLoader, setShowLoader] = useState<boolean>(true);

   const fetchApi = useCallback(async () => {
      const userResponse = await callApi("users", "get").catch((err) =>
         console.log({ err })
      );
      const productResponse = await callApi("products", "get").catch((err) =>
         console.log({ err })
      );
      const ageResponse = await callApi("ages", "get").catch((err) =>
         console.log({ err })
      );
      const branchResponse = await callApi("branches", "get").catch((err) =>
         console.log({ err })
      );
      const skillResponse = await callApi("skills", "get").catch((err) =>
         console.log({ err })
      );

      setData({
         users: userResponse.data || [],
         products: productResponse.data || [],
         ages: ageResponse.data || [],
         branches: branchResponse.data || [],
         skills: skillResponse.data || [],
         orders: [],
      });
      setShowLoader(false);
   }, []);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   return (
      <div className="container text-dark">
         {showLoader && <Loader />}
         <Link
            to="/admin/user-list"
            className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 inline-block m-10 bg-blue-700"
         >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               User Accounts Management
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Total of accounts: {data ? data.users.length : 0}
            </p>
         </Link>
         <Link
            to="/admin/product-list"
            className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 inline-block m-10 bg-green-700"
         >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               Products Management
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Total of products: {data ? data.products.length : 0}
            </p>
         </Link>
         <Link
            to="/admin/age-category-list"
            className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 inline-block m-10 bg-orange-700"
         >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               Age Category Management
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Total of ages: {data ? data.ages.length : 0}
            </p>
         </Link>
         <Link
            to="/admin/branch-category-list"
            className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 inline-block m-10 bg-pink-700"
         >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               Branch Category Management
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Total of branches: {data ? data.branches.length : 0}
            </p>
         </Link>
         <Link
            to="/admin/skill-category-list"
            className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 inline-block m-10 bg-purple-700"
         >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               Skill Category Management
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Total of skills: {data ? data.skills.length : 0}
            </p>
         </Link>
         <Link
            to="/admin/order-list"
            className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 inline-block m-10 bg-red-700"
         >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               Orders Management
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
               Total of orders: {data ? data.orders.length : 0}
            </p>
         </Link>
      </div>
   );
};
