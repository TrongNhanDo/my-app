import { AgeType, BranchType, ProductType, SkillType } from '../common/types';

export type ActionReducerType = {
  type: string;
  payload: ProductListType | null;
};

export type ProductListType = {
  products: ProductType[];
  totalPage: number;
  count: number;
  returnCnt: number;
};

export type StateReducerType = {
  ageCategory?: AgeType[];
  branchCategory?: BranchType[];
  skillCategory?: SkillType[];
};

export type FormikBagType = {
  ageId: number;
  branchId: number;
  skillId: number;
  productName: string;
  price: string;
  describes: string;
  amount: number;
  images: string[];
};

export const InitFormikValues = {
  ageId: 1,
  branchId: 1,
  skillId: 1,
  productName: '',
  price: '',
  describes: '',
  amount: 0,
  images: [],
};
