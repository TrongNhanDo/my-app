import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NewProducts = React.memo(() => {
   const { t } = useTranslation();

   return (
      <div className="w-full flex flex-col bg-white rounded p-5 mt-5">
         <div className="flex w-full items-center">
            <div className="uppercase text-2xl font-bold w-1/2">
               {t("user.homepage.new_product")}
            </div>
            <div className="w-1/2 flex justify-end">
               <Link to="" className="hover:text-blue-500">
                  {t("user.homepage.see_more")}
               </Link>
            </div>
         </div>
         <div className="flex w-full mt-5 justify-center">
            {t("user.homepage.updating_product")}
         </div>
      </div>
   );
});

export default NewProducts;
