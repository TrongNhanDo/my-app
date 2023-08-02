import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Sidebar = React.memo(() => {
   const { t } = useTranslation(['user_footer']);

   return (
      <div className="flex flex-col px-2">
         <div className="uppercase text-xl font-bold">
            {t('customer_support')} ▼
         </div>
         <ul>
            <li className="py-2">
               <Link to="/about" className="hover:text-blue-500">
                  {t('about_shop')}
               </Link>
            </li>
            <li className="py-2">
               <Link to="/shopping-guide" className="hover:text-blue-500">
                  {t('shopping_guide')}
               </Link>
            </li>
            <li className="py-2">
               <Link to="/delivery-and-payment" className="hover:text-blue-500">
                  {t('payment_delivery')}
               </Link>
            </li>
            <li className="py-2">
               <Link to="/questions" className="hover:text-blue-500">
                  {t('frequently_question')}
               </Link>
            </li>
            <li className="py-2">
               <Link to="/policy" className="hover:text-blue-500">
                  {t('term_service')}
               </Link>
            </li>
         </ul>
         <div className="uppercase text-xl font-bold mt-3">{t('policy')} ▼</div>
         <ul>
            <li className="py-2">
               <Link to="/warranty" className="hover:text-blue-500">
                  {t('warranty')}
               </Link>
            </li>
            <li className="py-2">
               <Link to="/security" className="hover:text-blue-500">
                  {t('security')}
               </Link>
            </li>
         </ul>
      </div>
   );
});

export default Sidebar;
