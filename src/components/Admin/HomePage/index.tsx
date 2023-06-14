import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateReducerType } from "./types";
import { callApi } from "../../../api/callApi/callApi";
import Loader from "../../Common/Loader/loader";

const AdminHome = React.memo(() => {
   const [data, setData] = useState<StateReducerType>();
   const [showLoader, setShowLoader] = useState<boolean>(true);

   const fetchApi = useCallback(async () => {
      const userResponse = await callApi("users", "get").catch((err) =>
         console.log({ userError: err })
      );
      const productResponse = await callApi("products", "get").catch((err) =>
         console.log({ productError: err })
      );
      const ageResponse = await callApi("ages", "get").catch((err) =>
         console.log({ ageError: err })
      );
      const branchResponse = await callApi("branches", "get").catch((err) =>
         console.log({ branchError: err })
      );
      const skillResponse = await callApi("skills", "get").catch((err) =>
         console.log({ skillError: err })
      );
      const roleResponse = await callApi("roles", "get").catch((err) =>
         console.log({ roleError: err })
      );

      setData({
         users: userResponse.data || [],
         products: productResponse.data || [],
         ages: ageResponse.data || [],
         branches: branchResponse.data || [],
         skills: skillResponse.data || [],
         roles: roleResponse.data || [],
         orders: [],
      });
      setShowLoader(false);
   }, []);

   useEffect(() => {
      fetchApi();
   }, [fetchApi]);

   return (
      <div className="div-contai text-dark">
         {showLoader && <Loader />}
         <div className="grid grid-cols-4 gap-4">
            <Link
               to="/admin/user-list"
               className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-400 inline-block m-10 bg-blue-400 w-full"
            >
               <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  User Accounts Management
               </h5>
               <p className="font-normal text-gray-700 dark:text-gray-400">
                  Total of accounts: {data ? data.users.length : 0}
               </p>
            </Link>
            <Link
               to="/admin/role-list"
               className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-400 inline-block m-10 bg-amber-400 w-full"
            >
               <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Roles Management
               </h5>
               <p className="font-normal text-gray-700 dark:text-gray-400">
                  Total of accounts: {data ? data.roles.length : 0}
               </p>
            </Link>
            <Link
               to="/admin/product-list"
               className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-400 inline-block m-10 bg-green-400 w-full"
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
               className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-400 inline-block m-10 bg-orange-400 w-full"
            >
               <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Age Category Management
               </h5>
               <p className="font-normal text-gray-700 dark:text-gray-400">
                  Total of ages: {data ? data.ages.length : 0}
               </p>
            </Link>
         </div>
         <div className="grid grid-cols-4 gap-4">
            <Link
               to="/admin/branch-category-list"
               className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-400 inline-block m-10 bg-pink-400 w-full"
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
               className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-400 inline-block m-10 bg-purple-400 w-full"
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
               className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-400 inline-block m-10 bg-red-400 w-full"
            >
               <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Orders Management
               </h5>
               <p className="font-normal text-gray-700 dark:text-gray-400">
                  Total of orders: {data ? data.orders.length : 0}
               </p>
            </Link>
         </div>
      </div>
   );
});

export default AdminHome;
