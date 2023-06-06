import { BranchType } from "../Common/types";

export type StateReducerType = {
   branches: BranchType[] | null;
   totalPage: number;
};

export const InitStateReducerType = {
   branches: null,
   totalPage: 0,
};

export type ActionReducerType = {
   type: string;
   payload: StateReducerType;
};
