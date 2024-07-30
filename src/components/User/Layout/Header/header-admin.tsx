import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import i18n from '../../../../i18n/i18n';
import { SumProductContext } from '../../../../context/SumProductContext';
import { getExpireCookie } from '../../../Common/Logic/logics';

const HeaderAdmin = React.memo(() => {
  const { t } = useTranslation(['admin_header']);
  const navigate = useNavigate();
  const { setUserId, setRoleId, setSumProduct, userId, locale, setLocale } =
    useContext(SumProductContext);
  const [modal, setModal] = useState<boolean>(false);

  const changeLanguage = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const languageValue = e.target.value;
      setLocale(languageValue);
      Cookies.set('locale', languageValue, { expires: getExpireCookie() });
      i18n.changeLanguage(languageValue);
    },
    [setLocale]
  );

  const handleLogout = useCallback(async () => {
    try {
      setModal(false);
      true;
      await setUserId('');
      await setRoleId('');
      await setSumProduct(0);
      await Cookies.remove('userId');
      await Cookies.remove('roleId');
      navigate('/admin/login');
    } catch (error) {
      console.log({ error });
    }
  }, [setSumProduct, setUserId, navigate, setRoleId]);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modal]);

  return (
    <>
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

      {userId && (
        <>
          <Link
            to="/admin"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
            aria-current="page"
          >
            {t('home')}
          </Link>

          <Link
            to="/admin/role-list"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {t('role')}
          </Link>

          <Link
            to="/admin/user-list"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {t('user')}
          </Link>

          <Link
            to="/admin/product-list"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {t('product')}
          </Link>

          <Link
            to="/admin/age-category-list"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {t('age')}
          </Link>

          <Link
            to="/admin/branch-category-list"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {t('branch')}
          </Link>

          <Link
            to="/admin/skill-category-list"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {t('skill')}
          </Link>

          <Link
            to="/admin/account-detail"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {t('my_account')}
          </Link>

          <button
            type="button"
            onClick={() => setModal(true)}
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            {t('logout')}
          </button>

          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2"
            value={locale}
            onChange={changeLanguage}
          >
            <option value="eng">English</option>
            <option value="vie">Vietnamese</option>
          </select>
        </>
      )}
    </>
  );
});

export default HeaderAdmin;
