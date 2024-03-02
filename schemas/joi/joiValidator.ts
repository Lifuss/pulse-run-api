import Joi from 'joi';

export const schemaSignup = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*[A-Za-z])[A-Za-z\d]{8,16}$/)
    .required(),
  firstName: Joi.string()
    .regex(/^[A-Za-zА-Яа-я\-]+$/)
    .min(1)
    .max(30)
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-zА-Яа-я\-]+$/)
    .min(1)
    .max(30)
    .required(),
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
  size: Joi.array().items(Joi.number()).required(),
  brand: Joi.string().required(),
  color: Joi.array().items(Joi.string()).required(),
});
