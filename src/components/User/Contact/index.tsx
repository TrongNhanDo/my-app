import React from 'react';
import Sidebar from '../../Common/Sidebar';
import { useTranslation } from 'react-i18next';

const Contact = React.memo(() => {
   const { t } = useTranslation(['user_contact']);

   return (
      <div className="div-contai flex">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               {t('title')}
            </div>
            <div className="flex mt-5">{t('updating_content')}</div>
         </div>
      </div>
   );
});

export default Contact;
