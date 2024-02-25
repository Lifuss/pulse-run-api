import Joi from 'joi';

export const schemaSignup = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
  password: Joi.string().min(8).max(16).required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const schemaSignIn = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
  password: Joi.string().min(8).max(16).required(),
});

export const schemaSubscribe = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
});

export const schemaProductCreate = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  sale: Joi.number(),
  description: Joi.string().required(),
  features: Joi.array().items(Joi.string()).required(),
  sex: Joi.string().required(),
  season: Joi.string().required(),
  size: Joi.number().required(),
  brand: Joi.string().required(),
  color: Joi.string().required(),
});
