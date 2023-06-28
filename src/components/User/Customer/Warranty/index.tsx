import React from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../../Common/Sidebar";

const Warranty = React.memo(() => {
   const { t } = useTranslation();
   return (
      <div className="div-contai flex mt-5">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               {t("user.exchange_warranty.title")}
            </div>
            <div className="flex flex-col mt-5">
               <div className="item-col">
                  <p>
                     <span style={{ color: "#356d69" }}>
                        <em>{t("user.exchange_warranty.text1")}</em>
                     </span>
                  </p>
                  <p>
                     <span style={{ color: "#356d69" }}>
                        <em>{t("user.exchange_warranty.text2")}</em>
                     </span>
                  </p>
                  <h3>
                     <span style={{ color: "#356d69" }}>
                        <strong>{t("user.exchange_warranty.heading1")}</strong>
                     </span>
                  </h3>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text3")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text4")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text5")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text6")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text7")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        <strong>{t("user.exchange_warranty.heading2")}</strong>
                     </span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text8")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text9")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text10")}
                     </span>
                  </p>
                  <h3>
                     <span style={{ color: "#356d69" }}>
                        <strong>{t("user.exchange_warranty.heading3")}</strong>
                     </span>
                  </h3>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text11")}
                     </span>
                  </p>
                  <div
                     className="mailmunch-forms-in-post-middle"
                     style={{ display: "none !important" }}
                  />
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text12")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text13")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text14")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text15")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text16")}
                     </span>
                  </p>
                  <h3>
                     <span style={{ color: "#356d69" }}>
                        <strong>{t("user.exchange_warranty.heading4")}</strong>
                     </span>
                  </h3>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        <strong>
                           {t("user.exchange_warranty.heading5")}&nbsp;
                        </strong>
                        {t("user.exchange_warranty.text17")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        <strong>
                           {t("user.exchange_warranty.heading6")}&nbsp;
                        </strong>
                        {t("user.exchange_warranty.text18")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text19")}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: "#356d69" }}>
                        {t("user.exchange_warranty.text20")}
                     </span>
                  </p>
                  <p>&nbsp;</p>
               </div>
            </div>
         </div>
      </div>
   );
});

export default Warranty;
