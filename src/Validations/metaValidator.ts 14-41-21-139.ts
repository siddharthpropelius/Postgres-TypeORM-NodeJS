import { checkSchema } from 'express-validator';

export const addMetaValidate = checkSchema({
  name: {
    isString: {
      errorMessage: 'Invalid name',
    },
    isLength: {
      errorMessage: 'invalid name',
      options: { min: 1 },
    },
  },
  description: {
    isString: {
      errorMessage: 'Invalid description',
    },
  },
  author: {
    isString: {
      errorMessage: 'Invalid author',
    },
  },
  keywords: {
    isString: {
      errorMessage: 'Invalid keywords',
    },
  },
});

module.exports = { addMetaValidate };
