import {
   AgeInitValue,
   AgeType,
   BranchInitValue,
   BranchType,
   InitProductValues,
   ProductType,
   SkillInitValue,
   SkillType,
} from "../common/types";

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
   rate: number;
   image1: string;
   image2?: string;
   image3?: string;
   image4?: string;
   image5?: string;
};

export const initFormikValues = {
   ageId: 0,
   branchId: 0,
   skillId: 0,
   productName: "",
   price: "",
   describes: "",
   amount: 0,
   rate: 0,
   image1: "",
   image2: "",
   image3: "",
   image4: "",
   image5: "",
};
