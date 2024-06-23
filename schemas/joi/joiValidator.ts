import Joi from 'joi';

const nameRegex = /^[A-Za-zа-яА-ЯіІїЇєЄґҐ']+(-[A-Za-zа-яА-ЯіІїЇєЄґҐ']+)?$/;
// const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})*$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z0-9!$#@])[A-Za-z\d!$#@]{8,20}$/;

export const schemaSignup = Joi.object({
  email: Joi.string()
    .regex(emailRegex)
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .max(64)
    .required(),
  password: Joi.string().min(8).max(16).regex(passwordRegex).required(),
  firstName: Joi.string().regex(nameRegex).min(1).max(30).required(),
  lastName: Joi.string().regex(nameRegex).min(1).max(30).required(),
});

export const schemaSignIn = Joi.object({
  email: Joi.string()
    .regex(emailRegex)
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .required(),
  password: Joi.string().min(8).max(16).regex(passwordRegex).required(),
});

export const schemaSubscribe = Joi.object({
  email: Joi.string()
    .regex(emailRegex)
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
  isMailing: Joi.boolean().default(false),
});

export const schemaUpdateUser = Joi.object({
  email: Joi.string()
    .regex(emailRegex)
    .email({ minDomainSegments: 2, tlds: { deny: ['ru'] } })
    .max(64),
  password: Joi.string().min(8).max(16).regex(passwordRegex),
  firstName: Joi.string().regex(nameRegex).min(1).max(30),
  lastName: Joi.string().regex(nameRegex).min(1).max(30),
  phone: Joi.string().regex(/^\+\d{9,20}$/),
});

export const schemaSupport = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-zа-яА-ЯіІїЇєЄ' -]+$/)
    .min(1)
    .max(60)
    .required(),
  email: Joi.string()
    .regex(emailRegex)
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
    .regex(/^(4|5)\d{15}$/)
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

export const orderJoiSchema = Joi.object({
  userId: Joi.string(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string()
        .required()
        .error(new Error('productId is required')),
      quantity: Joi.number()
        .required()
        .error(new Error('Quantity is required')),
      priceByOne: Joi.number()
        .required()
        .error(new Error('Price by one is required')),
      sizeId: Joi.string().required().error(new Error('sizeId is required')),
    }),
  ),
  priceSum: Joi.number().required().error(new Error('Final price is required')),
  orderDate: Joi.date().default(Date.now),
  deliveryAddress: Joi.string()
    .required()
    .error(new Error('Delivery address is required')),
  paymentMethod: Joi.string()
    .valid('card', 'cash')
    .required()
    .error(new Error('Payment method is required')),
  promoCode: Joi.string(),
  discount: Joi.number(),
  email: Joi.string().email().required().error(new Error('Email is required')),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required()
    .error(new Error('Phone is required')),
  name: Joi.string().required().error(new Error('Name is required')),
  isMailing: Joi.boolean().default(false),
});

export const schemaFavorite = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});
