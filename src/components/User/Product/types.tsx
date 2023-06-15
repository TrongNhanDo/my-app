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

export type DataPropsType = {
   count: number;
   returnCnt: number;
   totalPage: number;
   products: ProductType[];
};
