import Joi from "joi";

export const schemaSignup = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  password: Joi.string().min(8).max(16).required(),
  name: Joi.string().required(),
});
