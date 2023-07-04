import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import i18n from "../../../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { SumProductContext } from "../../../../context/SumProductContext";
import Loader from "../../../Common/Loader/loader";

const HeaderUser = React.memo(() => {
   const { t } = useTranslation();
   const { sumProduct, setSumProduct, userId, setUserId, locale, setLocale } =
      useContext(SumProductContext);
   const [loading, setLoading] = useState<boolean>(false);
   const [modal, setModal] = useState<boolean>(false);

   const changeLanguage = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
         const languageValue = e.target.value;
         setLocale(languageValue);
         localStorage.setItem("locale", languageValue);
         i18n.changeLanguage(languageValue);
      },
      [setLocale]
   );

   const handleLogout = useCallback(async () => {
      try {
         setModal(false);
         setLoading(true);
         await setUserId("");
         await setSumProduct(0);
         await sessionStorage.removeItem("userId");
         setLoading(false);
      } catch (error) {
         console.log({ error });
      }
   }, [setSumProduct, setUserId]);

   useEffect(() => {
      i18n.changeLanguage(locale);
   }, [locale]);

   useEffect(() => {
      if (modal) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }
   });

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
            <li>
               <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
               >
                  {t("user.header.home")}
               </Link>
            </li>
            <li>
               <Link
                  to="/product-list"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
               >
                  {t("user.header.product")}
               </Link>
            </li>
            <li>
               <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
               >
                  {t("user.header.service")}
               </Link>
            </li>
            <li>
               <Link
                  to="/about"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
               >
                  {t("user.header.about")}
               </Link>
            </li>
            <li>
               <Link
                  to="/contact"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
               >
                  {t("user.header.contact")}
               </Link>
            </li>
            <li>
               <Link
                  to="/carts"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 relative"
               >
                  {t("user.header.cart")}
                  <span className="absolute px-1 text-white bg-blue-700 rounded-full sum-count font-bold">
                     {sumProduct || 0}
                  </span>
               </Link>
            </li>
            {userId ? (
               <>
                  <li>
                     <Link
                        to="/my-account"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        {t("user.header.account")}
                     </Link>
                  </li>
                  <li>
                     <button
                        onClick={() => setModal(true)}
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        {t("user.header.logout")}
                     </button>
                  </li>
               </>
            ) : (
               <>
                  <li>
                     <Link
                        to="/login"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        {t("user.header.login")}
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/register"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        {t("user.header.register")}
                     </Link>
                  </li>
               </>
            )}

            <li>
               <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2"
                  value={locale}
                  onChange={changeLanguage}
               >
                  <option value="eng">English</option>
                  <option value="vie">Vietnamese</option>
               </select>
            </li>
         </ul>
      </>
   );
});

export default HeaderUser;
