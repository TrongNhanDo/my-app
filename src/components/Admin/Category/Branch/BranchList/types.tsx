import { BranchType } from '../Common/types';

export type StateReducerType = {
   branches: BranchType[] | null;
   totalPage: number;
   count: number;
   returnCnt: number;
};

export const InitStateReducerType = {
   branches: null,
   totalPage: 0,
   count: 0,
   returnCnt: 0,
};

export type ActionReducerType = {
   type: string;
   payload: StateReducerType;
};

export type FormikBagType = {
   branchId: string;
   branchName: string;
};

export const InitFormikBag = {
   branchId: '',
   branchName: '',
};
