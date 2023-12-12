import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Logics from '../../../Common/Logic/logics';
import { useFormik } from 'formik';
import { validationSchema } from './validations';

type FormikBagProps = {
  email: string;
};

const Footer = React.memo(() => {
  const { t } = useTranslation(['user_footer']);
  const currentPathname = useLocation().pathname;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    setIsAdmin(Logics.checkIsAdmin(currentPathname));
  }, [currentPathname]);

  const onSubmit = useCallback(async (formikValues: FormikBagProps) => {
    try {
      const response = await Logics.callApi('mails', Logics.MethodProps.POST, {
        email: formikValues.email,
      }).catch((err) => {
        setIsSuccess(false);
        Logics.showToast(
          err && err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : '',
          Logics.ToastTypeOptions.Error
        );
      });
      if (response) {
        setIsSuccess(true);
        Logics.showToast(
          'You have successfully registered!',
          Logics.ToastTypeOptions.Success
        );
      }
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const formikBag = useFormik({
    initialValues: { email: '' },
    validationSchema: validationSchema(t),
    onSubmit: (value) => onSubmit(value),
  });

  const handleSubmit = useCallback(() => {
    try {
      formikBag.submitForm();
    } catch (error) {
      console.log({ error });
    }
  }, [formikBag]);

  useEffect(() => {
    if (isSuccess) {
      formikBag.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <footer className="w-full mt-auto">
      {!isAdmin && (
        <div className="flex w-full bg-footer2">
          <div className="flex w-9/12 m-auto py-5 px-4">
            <div className="flex flex-col w-1/4">
              <div className="font-bold uppercase mb-3">
                {t('receive_news')}
              </div>
              <form onSubmit={formikBag.handleSubmit}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="px-2 py-2 rounded w-2/3"
                  onChange={formikBag.handleChange}
                  value={formikBag.values.email}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
                >
                  {t('btn_send')}
                </button>
              </form>
              {formikBag.errors.email && formikBag.touched.email && (
                <span className="text-red-500">{formikBag.errors.email}</span>
              )}
              <div className="font-bold text-base mt-3">{t('hotline')}</div>
              <div className="text-sm">{t('work_time')}</div>
              <div className="flex mt-1 items-center">
                <div className="text-3xl">📞</div>
                <div className="flex flex-col font-bold ps-4">
                  <Link to="tel:0123456789" className="hover:text-blue-500">
                    0123456789
                  </Link>
                  <Link to="tel:0123456789" className="hover:text-blue-500">
                    0123456789
                  </Link>
                </div>
              </div>
              <div className="flex mt-1 items-center">
                <div className="text-3xl flex items-center">✉️</div>
                <Link
                  to="mailto:dtnhan@gmail.com"
                  className="hover:text-blue-500 ps-4 pt-1"
                >
                  dtnhan@gmail.com
                </Link>
              </div>
              <div className="flex mt-1 items-center">
                <div className="text-3xl">🗺️</div>
                <Link
                  className="flex flex-col ps-4 hover:text-blue-500"
                  to="https://goo.gl/maps/ZoCGsEcjkwhWkw9R6"
                  target="_blank"
                >
                  {t('address')}
                </Link>
              </div>
            </div>
            <div className="flex flex-col w-1/4 ps-10 pe-5">
              <div className="font-bold uppercase mb-3">{t('information')}</div>
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
                  <Link
                    to="/delivery-and-payment"
                    className="hover:text-blue-500"
                  >
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
            </div>
            <div className="flex flex-col w-1/4 ps-5 pe-10">
              <div className="font-bold uppercase mb-3">{t('policy')}</div>
              <ul>
                <li className="py-2">
                  <Link to="/warranty" className="hover:text-blue-500">
                    {t('warranty')}
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-blue-500">
                    {t('security')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col w-1/4">
              <div className="font-bold uppercase mb-3">{t('follow')}</div>
              <ul className="flex">
                <li>
                  <Link to="">
                    <img
                      src="https://yay.toys/template/images/social/x-fb.svg"
                      alt=""
                      className="rounded h-9 w-9"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <img
                      src="https://yay.toys/template/images/social/x-shoppee.svg"
                      alt=""
                      className="rounded ms-3 h-9 w-9"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <img
                      src="https://yay.toys/template/images/social/x-tiktok.svg"
                      alt=""
                      className="rounded ms-3 h-9 w-9"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <img
                      src="https://yay.toys/template/images/social/x-insta.svg"
                      alt=""
                      className="rounded ms-3 h-9 w-9"
                    />
                  </Link>
                </li>
              </ul>
              <div className="font-bold uppercase mb-3 mt-4">
                {t('payment')}
              </div>
              <ul className="flex">
                <li>
                  <Link to="">
                    <img
                      src="https://yay.toys/wp-content/uploads/2021/12/MoMo_Logo-e1667989207587.png"
                      alt=""
                      className="rounded bg-white h-9 w-9"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <img
                      src="https://yay.toys/wp-content/uploads/2021/12/visa-eps-vector-logo-e1667989227100.png"
                      alt=""
                      className="rounded ms-3 bg-white h-9 w-9"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <img
                      src="https://yay.toys/wp-content/uploads/2021/12/abc.png"
                      alt=""
                      className="rounded ms-3 bg-white h-9 w-9"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <img
                      src="https://yay.toys/wp-content/uploads/2021/12/JCB_logo.svg-e1667991432656.png"
                      alt=""
                      className="rounded ms-3 bg-white h-9 w-9"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <img
                      src="https://yay.toys/wp-content/uploads/2021/12/VNPAY.png"
                      alt=""
                      className="rounded ms-3 bg-white h-9 w-9"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full bg-footer1 flex-col items-center p-3 text-sm">
        <div className="flex font-bold text-base">{t('copyright')}</div>
      </div>
    </footer>
  );
});

export default Footer;
