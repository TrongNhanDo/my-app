export enum TypeValues {
  setNewestProductList = 'homepage/setNewestProductList',
}

export type RoleProps = {
  _id: string;
  roleId: number;
  roleName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const initRoleValues: RoleProps = {
  _id: '',
  updatedAt: '',
  roleName: '',
  createdAt: '',
  roleId: 0,
  __v: 0,
};

export type AgeProps = {
  _id: string;
  ageId: number;
  ageName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const initAgeValues: AgeProps = {
  _id: '',
  ageId: 0,
  ageName: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
};

export type BranchProps = {
  _id: string;
  branchId: number;
  branchName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const initBranchValues: BranchProps = {
  _id: '',
  branchId: 0,
  branchName: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
};

export type SkillProps = {
  _id: string;
  skillId: number;
  skillName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const initSkillValues: SkillProps = {
  _id: '',
  skillId: 0,
  skillName: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
};

export type ProductProps = {
  _id: string;
  ageId: number;
  branchId: number;
  skillId: number;
  productName: string;
  price: string;
  describes: string;
  amount: number;
  rate: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  age: AgeProps;
  branch: BranchProps;
  skill: SkillProps;
  __v: number;
};

export const initProductValues: ProductProps = {
  _id: '',
  ageId: 0,
  branchId: 0,
  skillId: 0,
  productName: '',
  price: '',
  describes: '',
  amount: 0,
  rate: 0,
  images: [],
  createdAt: '',
  updatedAt: '',
  age: initAgeValues,
  branch: initBranchValues,
  skill: initSkillValues,
  __v: 0,
};

export type HomePageProps = {
  newProductsList: ProductProps[];
};

export const initHomePagesValues: HomePageProps = {
  newProductsList: [],
};

export type StateAll = {
  homePage: HomePageProps;
};

export const initStateAll: StateAll = {
  homePage: initHomePagesValues,
};
