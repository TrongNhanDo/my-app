import React from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../Common/Sidebar';

const ExpressDelivery = React.memo(() => {
   const { t } = useTranslation(['user_express_delivery']);

   return (
      <div className="div-contai flex">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               {t('title')}
            </div>
            <div className="text-xl font-bold mt-3">{t('text1')}</div>
            <div className="text-base font-bold mt-3">{t('text1')}</div>
            <div className="text-sm mt-3">{t('text1')}</div>
         </div>
      </div>
   );
});

export default ExpressDelivery;
