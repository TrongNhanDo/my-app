export type BranchType = {
   _id: string;
   branchId: number;
   branchName: string;
   createdAt: string;
   updatedAt: string;
};

export const BranchInitValue = {
   _id: "",
   branchId: 0,
   branchName: "",
   createdAt: "",
   updatedAt: "",
};

export type AgeType = {
   _id: string;
   ageId: number;
   ageName: string;
   createdAt: string;
   updatedAt: string;
};

export const AgeInitValue = {
   _id: "",
   ageId: 0,
   ageName: "",
   createdAt: "",
   updatedAt: "",
};

export type SkillType = {
   _id: string;
   skillId: number;
   skillName: string;
   createdAt: string;
   updatedAt: string;
};

export const SkillInitValue = {
   _id: "",
   skillId: 0,
   skillName: "",
   createdAt: "",
   updatedAt: "",
};

export type ProductType = {
   _id: string;
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
   createdAt: string;
   updatedAt: string;
   age: AgeType;
   branch: BranchType;
   skill: SkillType;
};

export type InitProductType = {
   age: AgeType;
   branch: BranchType;
   skill: SkillType;
};

export type FormikAddProduct = {
   ageId: string;
   branchId: string;
   skillId: string;
   productName: string;
   price: string;
   describes: string;
   amount: string;
   image1?: File;
   image2?: File;
   image3?: File;
   image4?: File;
   image5?: File;
};

export const InitFormikAddProduct = {
   ageId: "",
   branchId: "",
   skillId: "",
   productName: "",
   price: "",
   describes: "",
   amount: "",
};

export type ProductListType = {
   products: ProductType[];
};

export type ActionType = {
   type: string;
   payload?: any;
};

export const ActionValues = {
   GET_PRODUCTS: "GET_PRODUCTS",
   SELECTED_PRODUCT: "SELECTED_PRODUCT",
};

export const InitProductValues = {
   _id: "",
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
   createdAt: "",
   updatedAt: "",
   age: AgeInitValue,
   branch: BranchInitValue,
   skill: SkillInitValue,
};
