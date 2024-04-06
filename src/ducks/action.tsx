import { ProductProps, TypeValues } from './types';

export const setNewestProductList = (payload?: ProductProps[]) => {
  return {
    type: TypeValues.setNewestProductList,
    payload,
  };
};
