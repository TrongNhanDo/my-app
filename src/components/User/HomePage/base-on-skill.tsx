import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BaseOnSkill = React.memo(() => {
   const { t } = useTranslation();

   return (
      <div className="w-full flex flex-col bg-white rounded p-5 mt-5">
         <div className="flex w-full items-center">
            <div className="uppercase text-2xl font-bold w-1/2">
               {t("user.homepage.base_on_skill")}
            </div>
            <div className="w-1/2 flex justify-end">
               <Link to="/product-list" className="hover:text-blue-500">
                  {t("user.homepage.see_more")}
               </Link>
            </div>
         </div>
         <div className="flex w-full mt-5 justify-around">
            <Link to="/product-list?skillId=2">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709994/childrenToy/skill2_hnd8te.png"
                  alt=""
                  width={200}
               />
            </Link>
            <Link to="/product-list?skillId=1">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709994/childrenToy/skill1_zq5iiu.png"
                  alt=""
                  width={200}
               />
            </Link>
            <Link to="/product-list?skillId=4">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709994/childrenToy/skill4_hepkcg.png"
                  alt=""
                  width={200}
               />
            </Link>
            <Link to="/product-list?skillId=3">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709994/childrenToy/skill3_dv779d.png"
                  alt=""
                  width={200}
               />
            </Link>
            <Link to="/product-list?skillId=5">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709994/childrenToy/skill5_h07f5p.png"
                  alt=""
                  width={200}
               />
            </Link>
            <Link to="/product-list?skillId=6">
               <img
                  src="https://res.cloudinary.com/dgc1ya9ud/image/upload/v1686709994/childrenToy/skill6_fuwpkn.png"
                  alt=""
                  width={200}
               />
            </Link>
         </div>
      </div>
   );
});

export default BaseOnSkill;
