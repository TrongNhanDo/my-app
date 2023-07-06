export type AgeType = {
   _id: string;
   ageId: number;
   ageName: string;
   createdAt: string;
   updatedAt: string;
   __v: string;
};

export type BranchType = {
   _id: string;
   branchId: number;
   branchName: string;
   createdAt: string;
   updatedAt: string;
   __v: string;
};

export type SkillType = {
   _id: string;
   skillId: number;
   skillName: string;
   createdAt: string;
   updatedAt: string;
   __v: string;
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
   images: string[];
   age: AgeType;
   branch: BranchType;
   skill: SkillType;
};

export type CartItemType = {
   _id: string;
   userId: string;
   productId: string;
   price: string;
   amount: number;
   total: string;
   createdAt: string;
   updatedAt: string;
   product: ProductType;
};

export type FormikBagProps = {
   fullname: string;
   gender: string;
   phone: string;
   address: string;
   notes: string;
   payment_method: string;
   total: string;
};

export const FormikBagInitialValues = {
   fullname: "",
   gender: "female",
   phone: "",
   address: "",
   notes: "",
   payment_method: "cod",
   total: "0",
};
