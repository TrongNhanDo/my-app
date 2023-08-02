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

export type FormikProps = {
   userId: string;
   cartItem: {
      productId: string;
      amount: string;
      price: string;
   }[];
};

export const FormikInitValues = {
   userId: '',
   cartItem: [
      {
         productId: '',
         amount: '1',
         price: '',
      },
   ],
};
