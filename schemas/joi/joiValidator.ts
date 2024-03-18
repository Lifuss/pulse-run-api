import Joi from 'joi';

const nameRegex = /^[A-Za-zа-яА-ЯіІїЇєЄґҐ' ]+(-[A-Za-zа-яА-ЯіІїЇєЄґҐ' ]+)?$/;

export const schemaSignup = Joi.object({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/,
    )
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .max(64)
    .required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{8,16}$/)
    .required(),
  firstName: Joi.string().regex(nameRegex).min(1).max(30).required(),
  lastName: Joi.string().regex(nameRegex).min(1).max(30).required(),
});

export const schemaSignIn = Joi.object({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/,
    )
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{8,16}$/)
    .required(),
});

export const schemaSubscribe = Joi.object({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/,
    )
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
});

export const schemaProductCreate = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  sale: Joi.number(),
  article: Joi.string(),
  description: Joi.string().required(),
  features: Joi.array().items(Joi.string()).required(),
  sex: Joi.string().required(),
  season: Joi.string().required(),
  size: Joi.array().items(Joi.number()).required(),
  brand: Joi.string().required(),
  color: Joi.array().items(Joi.string()).required(),
});

export const schemaUpdateUser = Joi.object({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/,
    )
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .max(64),
  password: Joi.string()
    .min(8)
    .max(16)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{8,16}$/),
  firstName: Joi.string().regex(nameRegex).min(1).max(30),
  lastName: Joi.string().regex(nameRegex).min(1).max(30),
  phone: Joi.string().regex(/^\d{9}$/),
});

export const schemaSupport = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-zа-яА-ЯіІїЇєЄ' -]+$/)
    .min(1)
    .max(60)
    .required(),
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/,
    )
    .email({
      minDomainSegments: 2,
      tlds: { deny: ['ru'] },
    })
    .required(),
  subject: Joi.string().min(1).max(50).required(),
  message: Joi.string().min(1).max(500).required(),
});

export const schemaPayment = Joi.object({
  cardNumber: Joi.string()
    .regex(/^\d{16}$/)
    .required(),
  cardName: Joi.string()
    .regex(/^[A-Za-z ]+$/)
    .min(1)
    .max(60)
    .required(),
  cardDate: Joi.date().iso().required(),
  cardCVC: Joi.string()
    .length(3)
    .pattern(/^[0-9]+$/)
    .required(),
});
