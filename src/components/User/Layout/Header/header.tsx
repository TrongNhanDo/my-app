import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkIsAdmin } from "./logics";

export const Header = () => {
   const currentPathname = useLocation().pathname;
   const [isAdmin, setIsAdmin] = useState<boolean>(false);

   useEffect(() => {
      setIsAdmin(checkIsAdmin(currentPathname));
   }, [currentPathname]);

   return (
      <div>
         <nav className="border-gray-200 bg-sky-400">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
               <Link to={isAdmin ? "admin" : ""} className="flex items-center">
                  <img
                     src="https://congcaphe.com/_next/static/images/vn-66e76189e15384f6034e56f129991d96.png"
                     className="h-8 mr-3"
                     alt="Flowbite Logo"
                  />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                     DTNHAN
                  </span>
               </Link>
               <div
                  className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                  id="mobile-menu-language-select"
               >
                  {isAdmin ? (
                     <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
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
                           <Link
                              to="/admin/logout"
                              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                           >
                              Logout
                           </Link>
                        </li>
                     </ul>
                  ) : (
                     <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                        <li>
                           <Link
                              to="/"
                              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                              aria-current="page"
                           >
                              Home
                           </Link>
                        </li>
                        <li>
                           <Link
                              to="/product-list"
                              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                           >
                              Products
                           </Link>
                        </li>
                        <li>
                           <Link
                              to="/"
                              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                           >
                              Services
                           </Link>
                        </li>
                        <li>
                           <Link
                              to="/"
                              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                           >
                              Pricing
                           </Link>
                        </li>
                        <li>
                           <Link
                              to="/"
                              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                           >
                              Contact
                           </Link>
                        </li>
                        <li>
                           <Link
                              to="/login"
                              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                           >
                              Login
                           </Link>
                        </li>
                        <li>
                           <Link
                              to="/register"
                              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                           >
                              Register
                           </Link>
                        </li>
                     </ul>
                  )}
               </div>
            </div>
         </nav>
      </div>
   );
};
