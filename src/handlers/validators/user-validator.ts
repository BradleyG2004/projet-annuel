import Joi from "joi";

export const useRevalidation = Joi.object<UserRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}).options({abortEarly: false});

export interface UserRequest {
  email: string;
  password: string;
}

export const listUserValidation = Joi.object<ListUserRequest>({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional()
}).options({ abortEarly: false});

export interface ListUserRequest {
  page?: number;
  limit?: number;
}
