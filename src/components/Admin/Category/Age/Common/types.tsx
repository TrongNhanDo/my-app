export type AgeType = {
   _id: string;
   ageId: number;
   ageName: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
};

export type InitReducer = {
   ages: AgeType[] | null;
   totalPage: number;
   count: number;
   returnCnt: number;
};

export type InputActionType = {
   type: string;
   payload?: InitReducer;
};

export type FormikUpdate = {
   ageId: number;
   ageName: string;
};
