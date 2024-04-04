import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DataPropsType, ProductType } from './types';
import {
  MethodProps,
  callApi,
  formatCurrency,
  renderStar,
  scrollTop,
} from '../../Common/Logic/logics';
import Loader from '../../Common/Loader/loader';
import SearchForm from './form-search';
import { useTranslation } from 'react-i18next';

const UserProductList = React.memo(() => {
  const { t } = useTranslation(['user_product', 'user_error']);
  const [searchParams] = useSearchParams();
  const [viewData, setViewData] = useState<DataPropsType>();
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const dataPerPage = import.meta.env.VITE_PER_PAGE || 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const queryParams = useMemo(() => {
    const ageId = searchParams.get('ageId') || '';
    const branchId = searchParams.get('branchId') || '';
    const skillId = searchParams.get('skillId') || '';
    const productName = searchParams.get('productName') || '';
    return {
      ageId: ageId ? ageId.split(',') : [],
      branchId: branchId ? branchId.split(',') : [],
      skillId: skillId ? skillId.split(',') : [],
      productName: productName.trim(),
    };
  }, [searchParams]);

  const fetchApi = useCallback(async () => {
    setShowLoading(true);
    setCurrentPage(1);
    const response = await callApi('products/paginate', MethodProps.POST, {
      perPage: dataPerPage,
      page: 1,
      ...queryParams,
    }).catch((err) => console.log({ err }));
    const data: DataPropsType = response.data || [];
    setViewData(data);
    setShowLoading(false);
    scrollTop();
  }, [dataPerPage, queryParams]);

  const changePage = useCallback(
    async (perPage: number, page: number) => {
      setShowLoading(true);
      setCurrentPage(page);
      const response = await callApi('products/paginate', MethodProps.POST, {
        perPage: perPage || 10,
        page: page || 1,
        ...queryParams,
      }).catch((err) => console.log({ err }));
      const data: DataPropsType = response.data || null;
      setViewData(data);
      scrollTop();
      setShowLoading(false);
    },
    [queryParams]
  );

  const Pagination = useMemo(() => {
    const buttons = [];
    if (viewData && viewData.totalPage > 1) {
      for (let index = 1; index <= viewData.totalPage; index++) {
        const isCurrentPage = currentPage === index;
        buttons.push(
          <button
            key={index}
            type="button"
            className={`focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
              isCurrentPage
                ? 'bg-gray-400 cursor-not-allowed'
                : 'hover:bg-green-800 bg-green-700'
            }`}
            onClick={() => changePage(dataPerPage, index)}
            disabled={isCurrentPage}
          >
            {index}
          </button>
        );
      }
    }
    return buttons.length > 0 ? buttons : [];
  }, [changePage, viewData, dataPerPage, currentPage]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <div className="div-contai">
      {showLoading && <Loader />}
      <div className="flex w-full">
        <div className="w-1/4 p-4 bg-white h-fit rounded me-5">
          <SearchForm />
        </div>
        <div className="w-3/4 bg-white rounded">
          {viewData && viewData.products && viewData.products.length ? (
            <>
              {viewData.products.map((value: ProductType, index: number) => (
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
                        {value.age && value.age.ageName
                          ? value.age.ageName
                          : ''}
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
              {Pagination.length ? (
                <div className="flex w-full justify-center mt-3">
                  {Pagination}
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-center py-10">
                {t('updating_product')}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default UserProductList;
