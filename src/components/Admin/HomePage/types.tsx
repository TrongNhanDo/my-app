export type UserType = {
   active: boolean;
   createdAt: string;
   role: number;
   updatedAt: string;
   username: string;
   __v: number;
   _id: string;
};

export type BranchType = {
   _id: string;
   branchId: number;
   branchName: string;
   createdAt: string;
   updatedAt: string;
};

export type AgeType = {
   _id: string;
   ageId: number;
   ageName: string;
   createdAt: string;
   updatedAt: string;
};

export type SkillType = {
   _id: string;
   skillId: number;
   skillName: string;
   createdAt: string;
   updatedAt: string;
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

export type StateReducerType = {
   users: UserType[];
   products: ProductType[];
   ages: AgeType[];
   branches: BranchType[];
   skills: SkillType[];
   orders: [];
};
