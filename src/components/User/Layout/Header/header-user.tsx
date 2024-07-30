import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import i18n from '../../../../i18n/i18n';
import { SumProductContext } from '../../../../context/SumProductContext';
import { getExpireCookie } from '../../../Common/Logic/logics';

const HeaderUser = React.memo(() => {
  const { t } = useTranslation(['user_header']);
  const navigate = useNavigate();
  const {
    sumProduct,
    setSumProduct,
    userId,
    setUserId,
    locale,
    setLocale,
    setRoleId,
  } = useContext(SumProductContext);
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
    if (confirm('Log out ???')) {
      setModal(false);
      await setUserId('');
      await setRoleId('');
      await Cookies.remove('userId');
      await Cookies.remove('roleId');
      await setSumProduct(0);
      navigate('/');
    }
  }, [navigate, setRoleId, setSumProduct, setUserId]);

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
      <Link
        to="/"
        className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0"
        aria-current="page"
      >
        {t('home')}
      </Link>

      <Link
        to="/product-list"
        className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0"
      >
        {t('product')}
      </Link>

      <Link
        to="/"
        className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0"
      >
        {t('service')}
      </Link>

      <Link
        to="/about"
        className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0"
      >
        {t('about')}
      </Link>

      <Link
        to="/contact"
        className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0"
      >
        {t('contact')}
      </Link>

      <Link
        to="/carts"
        className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0 relative"
      >
        {t('cart')}
        <span className="absolute px-1 text-white bg-blue-700 rounded-full sum-count font-bold">
          {sumProduct || 0}
        </span>
      </Link>

      {userId ? (
        <>
          <Link
            to="/my-account"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0"
          >
            {t('account')}
          </Link>

          <button
            onClick={handleLogout}
            className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0"
          >
            {t('logout')}
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0"
          >
            {t('login')}
          </Link>

          <Link
            to="/register"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 font-bold md:p-0"
          >
            {t('register')}
          </Link>
        </>
      )}

      <select
        id="countries"
        className="block py-2 pl-4 pr-4 text-gray-900 rounded font-bold md:p-1"
        value={locale}
        onChange={changeLanguage}
      >
        <option value="eng">English</option>
        <option value="vie">Vietnamese</option>
      </select>
    </>
  );
});

export default HeaderUser;
