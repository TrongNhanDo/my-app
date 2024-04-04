import { RoleProps, TypeValues } from './types';

export const setNewestProductList = (payload?: RoleProps[]) => {
  return {
    type: TypeValues.setNewestProductList,
    payload,
  };
};
