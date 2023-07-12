import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkIsAdmin } from "../../../Common/Logic/logics";
import HeaderAdmin from "./header-admin";
import HeaderUser from "./header-user";

const Header = React.memo(() => {
   const currentPathname = useLocation().pathname;
   const [isAdmin, setIsAdmin] = useState<boolean>(false);

   useEffect(() => {
      setIsAdmin(checkIsAdmin(currentPathname));
   }, [currentPathname]);

   return (
      <div>
         <nav className="border-gray-200 bg-footer2">
            <div className="w-9/12 flex flex-wrap items-center justify-between mx-auto p-4">
               <Link to={isAdmin ? "admin" : ""} className="flex items-center">
                  <img
                     src="https://congcaphe.com/_next/static/images/vn-66e76189e15384f6034e56f129991d96.png"
                     className="h-8 mr-3"
                     alt={`${import.meta.env.VITE_WEB_NAME} Logo`}
                  />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap">
                     {import.meta.env.VITE_WEB_NAME}
                  </span>
               </Link>
               <div
                  className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                  id="mobile-menu-language-select"
               >
                  {isAdmin ? <HeaderAdmin /> : <HeaderUser />}
               </div>
            </div>
         </nav>
      </div>
   );
});

export default Header;
