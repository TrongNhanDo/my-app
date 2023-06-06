export type AgeType = {
   _id: string;
   ageId: number;
   ageName: string;
   createdAt: string;
   updatedAt: string;
   _v: number;
};

export type InitReducer = {
   ages?: AgeType[];
   totalPage: number;
};

export type InputActionType = {
   type: string;
   payload?: InitReducer;
};

export type FormikUpdate = {
   ageId: number;
   ageName: string;
};
