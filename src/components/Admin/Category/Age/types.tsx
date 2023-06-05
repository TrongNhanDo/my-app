export type Age = {
   _id: string;
   ageId: number;
   ageName: string;
   createdAt: string;
   updatedAt: string;
   _v: number;
};

export type InitReducer = {
   ages?: Age[];
   totalPage: number;
};

export type InputActionType = {
   type: string;
   payload?: any;
};

export type FormikUpdate = {
   ageId: number;
   ageName: string;
};
