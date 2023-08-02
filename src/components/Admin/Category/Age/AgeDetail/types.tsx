export type ActionReducerType = {
   type: string;
   payload: AgeType | null;
};

export type StateReducerType = {
   age: AgeType | null;
};

export type AgeType = {
   _id: string;
   ageId: number;
   ageName: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
};

export const InitAgeValue = {
   _id: '',
   ageId: 0,
   ageName: '',
   createdAt: '',
   updatedAt: '',
   __v: 0,
};

export const InitStateReducerType = {
   age: InitAgeValue,
};

export type FormikBagType = {
   ageName: string;
};
