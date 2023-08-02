import { BranchType } from '../Common/types';

export type StateReducerType = {
   branch: BranchType | null;
};

export const InitBranchValue = {
   _id: '',
   branchId: 0,
   branchName: '',
   createdAt: '',
   updatedAt: '',
   __v: 0,
};

export const InitStateReducerType = {
   branch: InitBranchValue,
};

export type ActionReducerType = {
   type: string;
   payload: BranchType | null;
};

export type FormikBagType = {
   branchName: string;
};
