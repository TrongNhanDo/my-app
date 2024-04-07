import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectors } from '../../../ducks';
import { ProductProps } from '../../../ducks/types';
import {
  MethodProps,
  callApi,
  formatCurrency,
  renderStar,
} from '../../Common/Logic/logics';
import * as actions from '../../../ducks/action';

const NewProducts = React.memo(() => {
  const { t } = useTranslation(['user_home']);
  const [productList, setProductList] = useState<ProductProps[]>([]);
  const dispatch = useDispatch();

  const products: ProductProps[] = useSelector(selectors.getNewestProductList);

  console.log({ products });

  const fetchApi = useCallback(async () => {
    const response = await callApi(
      'products/get-newest-products',
      MethodProps.GET
    ).catch((err) => console.log({ err }));
    const data: ProductProps[] = response ? response.data || [] : [];
    setProductList(data);
    dispatch(actions.setNewestProductList(data));
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col bg-white rounded p-5 mt-5">
      <div className="flex w-full items-center">
        <div className="uppercase text-2xl font-bold w-1/2">
          {t('new_product')}
        </div>
        <div className="w-1/2 flex justify-end">
          <Link to="/product-list" className="hover:text-blue-500">
            {t('see_more')}
          </Link>
        </div>
      </div>
      <div className="flex w-full mt-5 justify-center">
        {productList && productList.length ? (
          <>
            {productList.map((value: ProductProps, index: number) => (
              <div className="w-1/3 inline-block p-4" key={index}>
                <Link
                  to={`/product-detail/${value._id}`}
                  className="flex flex-col w-full bg-white hover:bg-gray-100 p-4 rounded border-solid border-2 border-gray-200"
                >
                  <img
                    src={
                      value.images && value.images[0]
                        ? value.images[0]
                        : import.meta.env.VITE_IMAGE_NOT_FOUND || ''
                    }
                    alt=""
                    className="w-full h-52 object-cover rounded"
                  />
                  <div className="font-bold mt-2 mb-1 line-clamp-2 text-center">
                    {value.productName || ''}
                  </div>
                  <div className="text-center">
                    {t('branch')}:{' '}
                    <span className="font-bold">
                      {value.branch && value.branch.branchName
                        ? value.branch.branchName
                        : ''}
                    </span>
                  </div>
                  <div className="text-center my-1">
                    {t('age')}:{' '}
                    <span className="font-bold">
                      {value.age && value.age.ageName ? value.age.ageName : ''}
                    </span>
                  </div>
                  <div className="text-center">
                    {t('skill')}:{' '}
                    <span className="font-bold">
                      {value.skill && value.skill.skillName
                        ? value.skill.skillName
                        : ''}
                    </span>
                  </div>
                  <div className="flex justify-center my-1">
                    {renderStar(value.rate || 0)} {'(0)'}
                  </div>
                  <div className="text-center font-bold text-xl text-orange-800">
                    {value.price ? formatCurrency(value.price) : '0'}
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : (
          <>{t('updating_product')}</>
        )}
      </div>
    </div>
  );
});

export default NewProducts;
