import * as Yup from 'yup';

export const validationSchema = () => {
  const validation = Yup.object().shape({
    ageId: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Category ID must be a natural number'),
    ageName: Yup.string().required(),
  });

  return validation;
};
