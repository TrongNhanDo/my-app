export type SkillType = {
   _id: string;
   skillId: number;
   skillName: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
};

export const ActionValues = {
   SET_SKILLS: 'SET_SKILLS',
   GET_SKILL: 'GET_SKILL',
};
