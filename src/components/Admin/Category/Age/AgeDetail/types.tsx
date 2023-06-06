export type ActionReducerType = {
   type: string;
   payload?: any;
};

export const InitState = {
   _id: "",
   ageId: 0,
   ageName: "",
   createdAt: "",
   updatedAt: "",
   __v: 0,
};

export type FormikBagType = {
   ageName: string;
};
