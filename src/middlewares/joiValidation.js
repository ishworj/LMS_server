import Joi from "joi";
const joiValidator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  error
    ? next({
        status: "error",
        message: error.message,
      })
    : next();
};

export const loginValidator = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });
  joiValidator(loginSchema, req, res, next);
};
export const registerValidator = (req, res, next) => {
  const registerSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
  });
  joiValidator(registerSchema, req, res, next);
};

export const createBookValidator = (req, res, next) => {

  console.log("in book validatir");
  const createBookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    // thumbnail: Joi.string().required(),
    isbn: Joi.string().required(),
    genre: Joi.string().required(),
    publishedYear: Joi.number().required(),
    description:Joi.string()
  });
  joiValidator(createBookSchema, req, res, next);
};


//update book validation
export const updateBookValidator = (req, res, next) => {

  const updateBookSchema = Joi.object({
    title: Joi.string().required(),
    // _id: Joi.string().required(),
    author: Joi.string().required(),
    status: Joi.string().required(),
    // thumbnail: Joi.string().required(),
    // isbn: Joi.string().required(),
    genre: Joi.string().required(),
    publishedYear: Joi.number().required(),
    description: Joi.string(),
    isAvailable: Joi.boolean(),
    expectedAvailable: Joi.string().allow("", null),
    averageRating: Joi.number(),
  });

  joiValidator(updateBookSchema, req, res, next);
};