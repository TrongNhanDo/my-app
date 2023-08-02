import { SkillType } from '../Common/types';

export type StateReducerType = {
   skill: SkillType | null;
};

export const InitSkillValue = {
   _id: '',
   skillId: 0,
   skillName: '',
   createdAt: '',
   updatedAt: '',
   __v: 0,
};

export const InitStateReducerType = {
   skill: InitSkillValue,
};

export type ActionReducerType = {
   type: string;
   payload: SkillType | null;
};

export type FormikBagType = {
   skillName: string;
};
