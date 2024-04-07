import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { CartItemType, FormikBagInitialValues, FormikBagProps } from './types';
import {
  MethodProps,
  callApi,
  formatCurrency,
} from '../../Common/Logic/logics';
import { validationSchema } from './validations';
import {
  paymentByCod,
  paymentByMoMo,
  paymentByTransfer,
  paymentByVnPay,
} from './payment';

const CheckoutPage = React.memo(() => {
  const { t } = useTranslation(['user_checkout', 'user_error']);
  const location = useLocation();
  const navigate = useNavigate();
  const [viewData, setViewData] = useState<CartItemType[]>();
  const { userId, shippingCost } = location.state;

  const fetchApi = useCallback(async () => {
    const response = await callApi('carts/get-by-userId', MethodProps.POST, {
      userId: userId,
    }).catch((err) => console.log({ err }));

    if (response) {
      const data: CartItemType[] = response.data;
      setViewData(data);
    }
  }, [userId]);

  const totalPrices = useMemo(() => {
    if (viewData && viewData.length) {
      return viewData.reduce((sum, cur) => sum + parseFloat(cur.total), 0);
    }
    return 0;
  }, [viewData]);

  useEffect(() => {
    if (!userId || !shippingCost) {
      navigate('/carts');
    } else {
      fetchApi();
    }
  }, [fetchApi, navigate, userId, shippingCost]);

  const onSubmit = useCallback(async (formikValues: FormikBagProps) => {
    let result = false;
    switch (formikValues.payment_method) {
      case 'vnpay':
        result = await paymentByVnPay(formikValues);
        break;
      case 'momo':
        result = await paymentByMoMo(formikValues);
        break;
      case 'transfer':
        result = await paymentByTransfer(formikValues);
        break;
      default:
        result = await paymentByCod(formikValues);
        break;
    }
    if (result) {
      console.log('success');
    } else {
      console.log('fail');
    }
  }, []);

  const formikBag = useFormik({
    initialValues: FormikBagInitialValues,
    validationSchema: validationSchema(t),
    onSubmit,
  });

  const handleSubmit = useCallback(() => {
    try {
      formikBag.submitForm();
    } catch (error) {
      console.log({ error });
    }
  }, [formikBag]);

  useEffect(() => {
    if (viewData && viewData.length && shippingCost) {
      formikBag.setFieldValue('total', Number(shippingCost) + totalPrices);
      formikBag.setFieldValue('userId', viewData[0].userId || '');
      viewData.map((value: CartItemType, index: number) => {
        formikBag.setFieldValue(
          `productsList[${index}].productId`,
          value.productId || ''
        );
        formikBag.setFieldValue(
          `productsList[${index}].amount`,
          value.amount || ''
        );
        formikBag.setFieldValue(
          `productsList[${index}].price`,
          value.price || ''
        );
        formikBag.setFieldValue(
          `productsList[${index}].total`,
          (Number(value.price || 0) * (value.amount || 0)).toString() || ''
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingCost, viewData]);

  return (
    <div className="div-contai bg-white py-5 px-10">
      <div className="text-2xl font-bold w-full text-center uppercase">
        {t('title')}
      </div>
      <hr className="w-full my-5" />
      <form onSubmit={formikBag.handleSubmit}>
        <div className="flex w-full">
          <div className="w-3/5">
            <div className="text-xl font-bold w-full mb-4 uppercase">
              {t('title1')}
            </div>
            <div className="flex flex-col w-10/12">
              <div className="w-full mb-3">
                <label htmlFor="name" className="block mb-2">
                  {t('name')} (*):
                </label>
                <input
                  type="name"
                  id="name"
                  className={`bg-gray-50 border border-gray-300 rounded-lg focus:border-yellow-500 block w-full px-3 py-2 ${
                    formikBag.errors.name && formikBag.touched.name
                      ? 'border-solid border-2 border-red-400'
                      : ''
                  }`}
                  placeholder={t('fullname_placeholder')}
                  value={formikBag.values.name}
                  onChange={formikBag.handleChange}
                />
                {formikBag.errors.name && formikBag.touched.name && (
                  <span className="text-red-600">{formikBag.errors.name}</span>
                )}
              </div>
              <div className="w-full mb-3">
                <label htmlFor="gender" className="block mb-2">
                  {t('gender')} (*):
                </label>
                <div className="w-full flex justify-around">
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      defaultValue="female"
                      checked={formikBag.values.gender === 'female'}
                      onChange={formikBag.handleChange}
                    />
                    <label className="ms-3 cursor-pointer" htmlFor="female">
                      Male
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      defaultValue="male"
                      checked={formikBag.values.gender === 'male'}
                      onChange={formikBag.handleChange}
                    />
                    <label className="ms-3 cursor-pointer" htmlFor="male">
                      Female
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="others"
                      defaultValue="others"
                      checked={formikBag.values.gender === 'others'}
                      onChange={formikBag.handleChange}
                    />
                    <label className="ms-3 cursor-pointer" htmlFor="others">
                      Others
                    </label>
                  </div>
                </div>
                {formikBag.errors.gender && formikBag.touched.gender && (
                  <span className="text-red-600">
                    {formikBag.errors.gender}
                  </span>
                )}
              </div>
              <div className="w-full mb-3">
                <label htmlFor="phone" className="block mb-2">
                  {t('phone')} (*):
                </label>
                <input
                  type="phone"
                  id="phone"
                  className={`bg-gray-50 border border-gray-300 rounded-lg focus:border-yellow-500 block w-full px-3 py-2 ${
                    formikBag.errors.phone && formikBag.touched.phone
                      ? 'border-solid border-2 border-red-400'
                      : ''
                  }`}
                  placeholder={t('phone_placeholder')}
                  value={formikBag.values.phone}
                  onChange={formikBag.handleChange}
                />
                {formikBag.errors.phone && formikBag.touched.phone && (
                  <span className="text-red-600">{formikBag.errors.phone}</span>
                )}
              </div>
              <div className="w-full mb-3">
                <label htmlFor="address" className="block mb-2">
                  {t('address')} (*):
                </label>
                <input
                  type="address"
                  id="address"
                  className={`bg-gray-50 border border-gray-300 rounded-lg focus:border-yellow-500 block w-full px-3 py-2 ${
                    formikBag.errors.address && formikBag.touched.address
                      ? 'border-solid border-2 border-red-400'
                      : ''
                  }`}
                  placeholder={t('address_placeholder')}
                  value={formikBag.values.address}
                  onChange={formikBag.handleChange}
                />
                {formikBag.errors.address && formikBag.touched.address && (
                  <span className="text-red-600">
                    {formikBag.errors.address}
                  </span>
                )}
              </div>
              <div className="w-full mb-3">
                <label htmlFor="notes" className="block mb-2">
                  {t('notes')}:
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:border-yellow-500 block w-full px-3 py-2"
                  placeholder={t('notes_placeholder')}
                  rows={3}
                  value={formikBag.values.notes}
                  onChange={formikBag.handleChange}
                ></textarea>
              </div>
              <div className="w-full mb-3">
                <label className="block mb-2">{t('payment_method')} (*):</label>
                <div className="flex flex-col w-full">
                  <div>
                    <input
                      type="radio"
                      name="payment_method"
                      id="vnpay"
                      defaultValue="vnpay"
                      onChange={formikBag.handleChange}
                      checked={formikBag.values.payment_method === 'vnpay'}
                    />
                    <label className="ms-3 cursor-pointer" htmlFor="vnpay">
                      {t('payment_by_vnpay')}
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="payment_method"
                      id="momo"
                      defaultValue="momo"
                      onChange={formikBag.handleChange}
                      checked={formikBag.values.payment_method === 'momo'}
                    />
                    <label className="ms-3 cursor-pointer" htmlFor="momo">
                      {t('payment_by_momo')}
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="payment_method"
                      id="transfer"
                      defaultValue="transfer"
                      onChange={formikBag.handleChange}
                      checked={formikBag.values.payment_method === 'transfer'}
                    />
                    <label className="ms-3 cursor-pointer" htmlFor="transfer">
                      {t('payment_by_transfer')}
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="payment_method"
                      id="cod"
                      defaultValue="cod"
                      checked={formikBag.values.payment_method === 'cod'}
                      onChange={formikBag.handleChange}
                    />
                    <label className="ms-3 cursor-pointer" htmlFor="cod">
                      {t('payment_by_cod')}
                    </label>
                  </div>
                </div>
                {formikBag.errors.payment_method &&
                  formikBag.touched.payment_method && (
                    <span className="text-red-600">
                      {formikBag.errors.payment_method}
                    </span>
                  )}
              </div>
              <hr className="w-full pb-5" />
              <div className="flex w-full mb-5 justify-around">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white block px-20 py-2 bg-green-600 hover:bg-green-700 rounded uppercase"
                >
                  {t('btn_payment')}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-white block px-20 py-2 bg-blue-500 hover:bg-blue-600 rounded uppercase"
                >
                  {t('btn_return')}
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/5 relative overflow-x-auto">
            <div className="text-xl font-bold w-full mb-4 uppercase">
              {t('title2')}
            </div>
            <div className="border-solid border-2 border-gray-100 rounded">
              <table className="w-full text-sm text-left text-gray-500 rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      {t('heading1')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t('heading2')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t('heading3')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t('heading4')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {viewData &&
                    viewData.length &&
                    viewData.map((value: CartItemType) => {
                      return (
                        <tr
                          key={value._id}
                          className="bg-white border-b text-black hover:bg-gray-100"
                        >
                          <td className="px-6 py-4">
                            <div className="line-clamp-2">
                              {value &&
                              value.product &&
                              value.product.productName
                                ? value.product.productName
                                : ''}
                            </div>
                          </td>
                          <td className="px-6">
                            {value && value.amount ? value.amount : ''}
                          </td>
                          <td className="px-6">
                            {value && value.price
                              ? formatCurrency(value.price)
                              : ''}
                          </td>
                          <td className="px-6">
                            {value && value.amount && value.price
                              ? formatCurrency(
                                  Number(value.amount) * Number(value.price)
                                )
                              : ''}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="flex flex-col w-full m-auto items-center text-base p-6">
                <div className="flex w-full justify-between">
                  <div>{t('heading5')}:</div>
                  <div>{formatCurrency(totalPrices || 0)}</div>
                </div>
                <div className="flex w-full justify-between">
                  <div>{t('heading6')}:</div>
                  <div>{formatCurrency(shippingCost || 0)}</div>
                </div>
                <hr className="w-full my-3" />
                <div className="flex w-full justify-between">
                  <div>{t('heading7')}:</div>
                  <div>{formatCurrency(formikBag.values.total || 0)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});

export default CheckoutPage;
