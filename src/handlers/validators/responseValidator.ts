import Joi from 'joi';

// creation de reponse
export const createResponsevalidation = Joi.object<CreateResponseRequest>({
  subject_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
  content: Joi.string().min(1).max(1000).required()
}).options({ abortEarly: false});

export interface CreateResponseRequest {
  subject_id: number;
  user_id: number;
  content: string;
}

// lecture d'une reponse par id
export const getResponseValidation = Joi.object<GetResponseRequest>({
  id: Joi.number().integer().required()
}).options({ abortEarly: false});

export interface GetResponseRequest{
  id: number;
}

// mise à jour de reponse
export const updateResponseValidation = Joi.object<UpdateResponseRequest>({
  content: Joi.string().min(1).max(1000).optional()
}).options({ abortEarly: false});

export interface UpdateResponseRequest {
  content?:string;
}

// suppression de reponse par id
export const deleteResponseValidaton = Joi.object<DeleteResponseRequest>({
  id: Joi.number().integer().required()
}).options ({ abortEarly: false});

export interface DeleteResponseRequest {
  id: number;
}
