import * as Yup from 'yup';

export const validationSchema = () => {
  const validation = Yup.object().shape({
    ageId: Yup.string()
      .required()
      .test({
        message: 'ageId must be than 0',
        test: (value) => parseInt(value) > 0,
      }),
    branchId: Yup.string()
      .required()
      .test({
        message: 'branchId must be than 0',
        test: (value) => parseInt(value) > 0,
      }),
    skillId: Yup.string()
      .required()
      .test({
        message: 'skillId must be than 0',
        test: (value) => parseInt(value) > 0,
      }),
    productName: Yup.string().required(),
    price: Yup.string()
      .required()
      .test({
        message: 'price must be than 0',
        test: (value) => parseInt(value) > 0,
      }),
    amount: Yup.string()
      .required()
      .test({
        message: 'amount must be than 0',
        test: (value) => parseInt(value) > 0,
      }),
    describes: Yup.string().required(),
    images: Yup.array()
      .required()
      .test({
        message: 'images is a required field',
        test: (value) => (value.length ? true : false),
      }),
  });

  return validation;
};
