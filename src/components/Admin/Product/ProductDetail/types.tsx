import {
   AgeInitValue,
   AgeType,
   BranchInitValue,
   BranchType,
   InitProductValues,
   ProductType,
   SkillInitValue,
   SkillType,
} from '../common/types';

export type StateReducerType = {
   product: ProductType;
   ageCategory: AgeType[];
   branchCategory: BranchType[];
   skillCategory: SkillType[];
};

export type ActionReducerType = {
   type: string;
   payload: {
      product: ProductType;
      ageCategory: AgeType[];
      branchCategory: BranchType[];
      skillCategory: SkillType[];
   };
};

export const initStateReducer = {
   product: InitProductValues,
   ageCategory: [AgeInitValue],
   branchCategory: [BranchInitValue],
   skillCategory: [SkillInitValue],
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
   productId: string;
};

export const initFormikValues = {
   ageId: 0,
   branchId: 0,
   skillId: 0,
   productName: '',
   price: '',
   describes: '',
   amount: 0,
   images: [],
   productId: '',
};
