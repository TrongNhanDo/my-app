import { SkillType } from "../Common/types";

export type StateReducerType = {
   skills: SkillType[] | null;
   totalPage: number;
   count: number;
   returnCnt: number;
};

export const InitStateReducerType = {
   skills: [],
   totalPage: 0,
   count: 0,
   returnCnt: 0,
};

export type ActionReducerType = {
   type: string;
   payload: StateReducerType;
};
