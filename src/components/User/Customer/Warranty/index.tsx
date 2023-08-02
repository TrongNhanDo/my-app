import React from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../Common/Sidebar';

const Warranty = React.memo(() => {
   const { t } = useTranslation(['user_exchange_warranty']);
   return (
      <div className="div-contai flex">
         <div className="w-1/4">
            <Sidebar />
         </div>
         <div className="w-3/4 bg-white rounded p-5 text-justify">
            <div className="uppercase text-2xl font-bold text-center">
               {t('title')}
            </div>
            <div className="flex flex-col mt-5">
               <div className="item-col">
                  <p>
                     <span style={{ color: '#356d69' }}>
                        <em>{t('text1')}</em>
                     </span>
                  </p>
                  <p>
                     <span style={{ color: '#356d69' }}>
                        <em>{t('text2')}</em>
                     </span>
                  </p>
                  <h3>
                     <span style={{ color: '#356d69' }}>
                        <strong>{t('heading1')}</strong>
                     </span>
                  </h3>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text3')}</span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text4')}</span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text5')}</span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: '#356d69' }}>{t('text6')}</span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: '#356d69' }}>{t('text7')}</span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>
                        <strong>{t('heading2')}</strong>
                     </span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: '#356d69' }}>{t('text8')}</span>
                  </p>
                  <p style={{ paddingLeft: 80 }}>
                     <span style={{ color: '#356d69' }}>{t('text9')}</span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text10')}</span>
                  </p>
                  <h3>
                     <span style={{ color: '#356d69' }}>
                        <strong>{t('heading3')}</strong>
                     </span>
                  </h3>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text11')}</span>
                  </p>
                  <div
                     className="mailmunch-forms-in-post-middle"
                     style={{ display: 'none !important' }}
                  />
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text12')}</span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text13')}</span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text14')}</span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text15')}</span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text16')}</span>
                  </p>
                  <h3>
                     <span style={{ color: '#356d69' }}>
                        <strong>{t('heading4')}</strong>
                     </span>
                  </h3>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>
                        <strong>{t('heading5')}&nbsp;</strong>
                        {t('text17')}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>
                        <strong>{t('heading6')}&nbsp;</strong>
                        {t('text18')}
                     </span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text19')}</span>
                  </p>
                  <p style={{ paddingLeft: 40 }}>
                     <span style={{ color: '#356d69' }}>{t('text20')}</span>
                  </p>
                  <p>&nbsp;</p>
               </div>
            </div>
         </div>
      </div>
   );
});

export default Warranty;
