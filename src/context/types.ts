export enum LocaleValues {
  ENG = 'eng',
  VIE = 'vie',
}

export type ContextProps = {
  sumProduct: number;
  setSumProduct: (sum: number) => void;
  userId: string;
  setUserId: (userId: string) => void;
  roleId: string | number;
  setRoleId: (roleId: number) => void;
  locale: string;
  setLocale: (locale: LocaleValues) => void;
};

export type ContextProviderProps = {
  children: React.ReactNode;
};
