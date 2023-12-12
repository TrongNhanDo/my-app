import * as Yup from 'yup';

export const validationSchema = () => {
  const validation = Yup.object().shape({
    branchId: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Branch ID must be a natural number'),
    branchName: Yup.string().required(),
  });

  return validation;
};
