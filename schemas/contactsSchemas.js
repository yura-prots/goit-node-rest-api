import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(2).messages({
    "any.required": `"name" is a required field`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
  }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "any.required": `"email" is a required field`,
      "string.empty": `"email" cannot be an empty field`,
    }),
  phone: Joi.string().required().min(7).messages({
    "any.required": `"phone" is a required field`,
    "string.empty": `"phone" cannot be an empty field`,
    "string.min": `"phone" should have a minimum length of {#limit}`,
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).messages({
    "string.min": `"name" should have a minimum length of {#limit}`,
  }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(7).messages({
    "string.min": `"phone" should have a minimum length of {#limit}`,
  }),
});
