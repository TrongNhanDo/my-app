import { MethodProps, callApi } from '../../Common/Logic/logics';
import { FormikBagProps } from './types';

export const paymentByCod = async (value: FormikBagProps): Promise<boolean> => {
  try {
    const response = await callApi('orders', MethodProps.POST, {
      ...value,
    }).catch((err) => {
      console.log({
        error:
          err && err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : '',
      });
      return false;
    });
    if (response) {
      return true;
    }
    return false;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const paymentByVnPay = async (
  value: FormikBagProps
): Promise<boolean> => {
  console.log({ value });
  return false;
};

export const paymentByMoMo = async (
  value: FormikBagProps
): Promise<boolean> => {
  console.log({ value });
  return false;
};

export const paymentByTransfer = async (
  value: FormikBagProps
): Promise<boolean> => {
  console.log({ value });
  return false;
};
