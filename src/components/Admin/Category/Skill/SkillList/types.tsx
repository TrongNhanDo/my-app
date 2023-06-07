import { SkillType } from "../Common/types";

export type StateReducerType = {
   skills: SkillType[] | null;
   totalPage: number;
};

export const InitStateReducerType = {
   skills: null,
   totalPage: 0,
};

export type ActionReducerType = {
   type: string;
   payload: StateReducerType;
};
