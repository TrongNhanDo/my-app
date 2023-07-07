import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SumProductContext } from "../../../../context/SumProductContext";
import Loader from "../../../Common/Loader/loader";

const HeaderAdmin = React.memo(() => {
   const navigate = useNavigate();
   const { setUserId, setRoleId, setSumProduct, userId } =
      useContext(SumProductContext);
   const [modal, setModal] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);

   const handleLogout = useCallback(async () => {
      try {
         setModal(false);
         setLoading(true);
         await setUserId("");
         await setRoleId("");
         await setSumProduct(0);
         await sessionStorage.removeItem("userId");
         setLoading(false);
         navigate("/admin/login");
      } catch (error) {
         console.log({ error });
      }
   }, [setSumProduct, setUserId, navigate, setRoleId]);

   useEffect(() => {
      if (modal) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }
   }, [modal]);

   return (
      <>
         {loading && <Loader />}
         {modal && (
            <div className="fixed flex w-full h-full bg-gray-500/75 top-0 left-0">
               <div className="flex flex-col w-3/12 h-auto bg-white m-auto items-center p-5 rounded index-30 font-bold">
                  <div className="flex w-full flex-col">
                     <span className="text-xl">
                        Are you sure you want to log out ?
                     </span>
                     <hr className="mt-4" />
                  </div>
                  <div className="flex w-full justify-around mt-5">
                     <button
                        type="button"
                        onClick={handleLogout}
                        className="block bg-red-500 px-5 py-2 rounded hover:bg-red-600"
                     >
                        LOG OUT
                     </button>
                     <button
                        type="button"
                        onClick={() => setModal(false)}
                        className="block bg-green-500 px-5 py-2 rounded hover:bg-green-600"
                     >
                        CANCEL
                     </button>
                  </div>
               </div>
            </div>
         )}
         <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
            {userId && (
               <>
                  <li>
                     <Link
                        to="/admin"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        aria-current="page"
                     >
                        Home
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/admin/role-list"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Roles
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/admin/user-list"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Users
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/admin/product-list"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Products
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/admin/age-category-list"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Ages
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/admin/branch-category-list"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Branches
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/admin/skill-category-list"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Skills
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/admin/account-detail"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        My Account
                     </Link>
                  </li>
                  <li>
                     <button
                        type="button"
                        onClick={() => setModal(true)}
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Logout
                     </button>
                  </li>
               </>
            )}
         </ul>
      </>
   );
});

export default HeaderAdmin;
