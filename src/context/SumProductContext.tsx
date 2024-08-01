import React from 'react';
import Cookies from 'js-cookie';
import { CartItemType } from '../components/User/Cart/types';
import { MethodProps, callApi } from '../components/Common/Logic/logics';
import * as ContextTypes from './types';

export const SumProductContext = React.createContext<ContextTypes.ContextProps>(
  {
    sumProduct: 0,
    setSumProduct: () => 0,
    userId: '',
    setUserId: () => '',
    roleId: '',
    setRoleId: () => 0,
    locale: '',
    setLocale: () => '',
  }
);

export const ContextProvider: React.FC<ContextTypes.ContextProviderProps> = ({
  children,
}) => {
  const [viewData, setViewData] = React.useState<CartItemType[]>();
  const [sumProduct, setSumProduct] = React.useState<number>(0);
  const [userId, setUserId] = React.useState<string>('');
  const [roleId, setRoleId] = React.useState<number>(0);
  const [locale, setLocale] = React.useState<ContextTypes.LocaleValues>(
    ContextTypes.LocaleValues.ENG
  );

  const localUserId = React.useMemo(() => {
    return userId || Cookies.get('userId') || '';
  }, [userId]);

  const localRoleId = React.useMemo(() => {
    return roleId || Number(Cookies.get('roleId') || 0);
  }, [roleId]);

  const localLocale = React.useMemo(() => {
    return locale || Cookies.get('locale') || 'eng';
  }, [locale]);

  const fetchApi = React.useCallback(async () => {
    if (userId) {
      const response = await callApi('carts/get-by-userId', MethodProps.POST, {
        userId: userId,
      }).catch((err) => console.log({ err }));

      const data: CartItemType[] = response.data;
      if (data) {
        setViewData(data);
      }
    }
  }, [userId]);

  const handleUserId = React.useCallback((userId: string) => {
    setUserId(userId || '');
  }, []);

  const handleRoleId = React.useCallback((roleId: number) => {
    setRoleId(roleId || 0);
  }, []);

  const handleLocale = React.useCallback(
    (locale: ContextTypes.LocaleValues) => {
      setLocale(locale);
    },
    []
  );

  const handleSumProduct = React.useCallback((sum: number) => {
    setSumProduct(sum);
  }, []);

  React.useEffect(() => {
    setUserId(localUserId);
  }, [localUserId]);

  React.useEffect(() => {
    setRoleId(localRoleId);
  }, [localRoleId]);

  React.useEffect(() => {
    setLocale(localLocale);
  }, [localLocale]);

  React.useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  React.useLayoutEffect(() => {
    if (viewData && viewData.length) {
      const total = viewData.reduce((sum, cur) => sum + cur.amount, 0);
      setSumProduct(total);
    }
  }, [viewData]);

  return (
    <SumProductContext.Provider
      value={{
        sumProduct,
        setSumProduct: handleSumProduct,
        userId,
        setUserId: handleUserId,
        roleId,
        setRoleId: handleRoleId,
        locale,
        setLocale: handleLocale,
      }}
    >
      {children}
    </SumProductContext.Provider>
  );
};
