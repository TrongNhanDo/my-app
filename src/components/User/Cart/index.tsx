import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { CartItemType, FormikInitValues, FormikProps } from './types';
import {
  MethodProps,
  callApi,
  formatCurrency,
} from '../../Common/Logic/logics';
import { validationSchema } from './validations';
import { SumProductContext } from '../../../context/SumProductContext';
import './cart.css';

const CartList = React.memo(() => {
  const { t } = useTranslation(['user_cart', 'user_error']);
  const navigate = useNavigate();
  const [viewData, setViewData] = useState<CartItemType[]>();
  const { setSumProduct, userId } = useContext(SumProductContext);
  const [isChangeForm, setIsChangeForm] = useState<boolean>(false);
  const [eventId, setEventId] = useState<string>('');
  const shippingCost = 30000;

  const currentUserId = useMemo(() => {
    return userId;
  }, [userId]);

  useEffect(() => {
    if (!currentUserId) {
      navigate('/login');
    }
  }, [navigate, currentUserId]);

  const fetchApi = useCallback(async () => {
    setIsChangeForm(false);
    const response = await callApi('carts/get-by-userId', MethodProps.POST, {
      userId: currentUserId,
    }).catch((err) => console.log({ err }));

    const data: CartItemType[] = response.data;
    if (data) {
      setViewData(data);
    }
  }, [currentUserId]);

  const handleDelete = useCallback(
    async (cartId: string) => {
      try {
        await callApi('carts', MethodProps.DELETE, { id: cartId }).catch(
          (err) => console.log({ err })
        );
        fetchApi();
      } catch (error) {
        console.log({ error });
      }
    },
    [fetchApi]
  );

  const onSubmit = useCallback(
    async (formikValues: FormikProps) => {
      if (eventId === 'update') {
        await callApi(
          'carts/update-cart/',
          MethodProps.POST,
          formikValues
        ).catch((err) => console.log({ err }));
        fetchApi();
      } else if (eventId === 'checkout') {
        navigate('/checkout', {
          state: {
            userId: formikValues.userId,
            shippingCost: shippingCost,
          },
        });
      }
    },
    [fetchApi, eventId, navigate]
  );

  const formikBag = useFormik({
    initialValues: FormikInitValues,
    validationSchema: validationSchema(t),
    onSubmit: (value) => onSubmit(value),
  });

  const handleSubmit = useCallback(
    (ev: string) => {
      try {
        setEventId(ev);
        formikBag.submitForm();
      } catch (error) {
        console.log({ error });
      }
    },
    [formikBag]
  );

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const totalProducts = useMemo(() => {
    if (viewData && viewData.length) {
      const total = viewData.reduce((sum, cur) => sum + cur.amount, 0);
      setSumProduct(total);
      return total;
    }
    setSumProduct(0);
    return 0;
  }, [viewData, setSumProduct]);

  const totalPrices = useMemo(() => {
    if (viewData && viewData.length) {
      return viewData.reduce((sum, cur) => sum + parseFloat(cur.total), 0);
    }
    return 0;
  }, [viewData]);

  useEffect(() => {
    if (viewData && viewData.length) {
      formikBag.setFieldValue('userId', viewData[0].userId || '');
      viewData.map((value: CartItemType, index: number) => {
        formikBag.setFieldValue(
          `cartItem[${index}].productId`,
          value.productId
        );
        formikBag.setFieldValue(`cartItem[${index}].amount`, value.amount);
        formikBag.setFieldValue(`cartItem[${index}].price`, value.price);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewData]);

  return (
    <div className="div-contai">
      {viewData && viewData.length ? (
        <div className="flex div-cart shadow-md">
          <div className="w-3/4 bg-white px-10 py-10 rounded">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">{t('title')}</h1>
              <h2 className="font-semibold text-2xl">
                {totalProducts + ' ' + t('product')}
              </h2>
            </div>
            <div className="div-heading flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/6">
                {t('header1')}
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/6 text-center">
                {t('header2')}
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/6 text-center">
                {t('header3')}
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/6 text-center">
                {t('header4')}
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/6 text-center">
                {t('header5')}
              </h3>
            </div>
            <hr />
            <form
              onSubmit={formikBag.handleSubmit}
              onChange={() => setIsChangeForm(true)}
            >
              {viewData &&
                viewData.length &&
                viewData.map((value: CartItemType, index: number) => {
                  return (
                    <div key={value._id}>
                      <div className="pd-row flex items-center hover:bg-gray-100 py-5">
                        <div className="flex w-2/6">
                          <div className="cart-image flex w-2/6 items-center">
                            <Link to={`/product-detail/${value.productId}`}>
                              <img
                                className="h-24 object-cover"
                                src={
                                  value.product &&
                                  value.product.images.length &&
                                  value.product.images[0]
                                    ? value.product.images[0]
                                    : import.meta.env.VITE_IMAGE_NOT_FOUND
                                }
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="div-info flex flex-col justify-between ml-4 flex-grow w-3/6">
                            <span className="font-bold line-clamp-2">
                              {value.product && value.product.productName
                                ? value.product.productName
                                : ''}
                            </span>
                            <span className="text-sm">
                              {value.product &&
                              value.product.branch &&
                              value.product.branch &&
                              value.product.branch.branchName
                                ? value.product.branch.branchName
                                : ''}
                            </span>
                            <span className="text-sm">
                              {value.product &&
                              value.product.age &&
                              value.product.age &&
                              value.product.age.ageName
                                ? value.product.age.ageName
                                : ''}
                            </span>
                            <span className="text-sm">
                              {value.product &&
                              value.product.skill &&
                              value.product.skill &&
                              value.product.skill.skillName
                                ? value.product.skill.skillName
                                : ''}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center w-1/6">
                          <input
                            type="number"
                            name={`cartItem[${index}].amount`}
                            id={`cartItem[${index}].amount`}
                            min={1}
                            value={
                              formikBag.values.cartItem[index]
                                ? formikBag.values.cartItem[index].amount
                                : 1
                            }
                            className="ms-5 px-4 py-2 rounded border-solid border-2 border-gray-200 font-bold text-base w-24"
                            onChange={formikBag.handleChange}
                          />
                        </div>
                        <div className="text-center w-1/6 font-semibold text-sm">
                          {formatCurrency(value.price || 0)}
                        </div>
                        <div className="text-center w-1/6 font-semibold text-sm">
                          {formatCurrency(value.total || 0)}
                        </div>
                        <div className="flex w-1/6 justify-center">
                          <button
                            className="font-semibold text-sm w-fit hover:bg-red-600 p-1 rounded"
                            type="button"
                            onClick={() => handleDelete(value._id || '')}
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
            </form>
            <div className="flex w-full items-center justify-around mt-5">
              <Link
                to="/product-list"
                className="block py-1 px-3 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                {t('btn_continue')}
              </Link>
              <button
                type="button"
                onClick={() => handleSubmit('update')}
                disabled={!isChangeForm}
                className={`block py-1 px-3 text-white rounded ${
                  isChangeForm
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {t('btn_update')}
              </button>
            </div>
          </div>
          <div className="w-1/4 px-8 py-10 border-solid border-2 border-gray-200 rounded font-bold">
            <div className="text-2xl">{t('title2')}</div>
            <hr className="w-full my-5" />
            <div className="flex w-full justify-between">
              <div className="text-sm">{t('product') + ':'}</div>
              <div className="">{totalProducts || 0}</div>
            </div>
            <div className="flex w-full my-5 justify-between">
              <div className="text-sm">TOTAL AMOUNT:</div>
              <div className="">{formatCurrency(totalPrices || 0)}</div>
            </div>
            <div className="flex w-full my-5 justify-between">
              <div className="text-sm">SHIPPING COST:</div>
              <div className="">{formatCurrency(shippingCost)}</div>
            </div>
            <hr className="w-full my-5" />
            <div className="flex w-full my-5 justify-between">
              <div className="text-sm">TOTAL:</div>
              <div className="">
                {formatCurrency(totalPrices + shippingCost)}
              </div>
            </div>
            <div className="border-t mt-8">
              <button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded"
                onClick={() => handleSubmit('checkout')}
              >
                {t('btn_checkout')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full rounded items-center bg-white mt-10 py-10">
          <span className="text-2xl font-bold">{t('empty_shopping_cart')}</span>
          <Link
            to="/product-list"
            className="mt-5 underline text-blue-600 hover:text-blue-400"
          >
            {t('see_product')}
          </Link>
        </div>
      )}
    </div>
  );
});

export default CartList;
