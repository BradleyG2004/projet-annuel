import Joi from 'joi';

// Création d'un sujet
export const createSubjectValidation = Joi.object<CreateSubjectRequest>({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required()
}).options({ abortEarly: false });

export interface CreateSubjectRequest {
  title: string;
  description: string;
}

// Lecture d'un sujet
export const getSubjectValidation = Joi.object<GetSubjectRequest>({
  id: Joi.number().integer().required()
}).options({ abortEarly: false });

export interface GetSubjectRequest {
  id: number;
}

// Mise à jour d'un sujet
export const updateSubjectValidation = Joi.object<UpdateSubjectRequest>({
  title: Joi.string().min(3).optional(),
  description: Joi.string().min(5).optional()
}).options({ abortEarly: false });

export interface UpdateSubjectRequest {
  title?: string;
  description?: string;
}

// Suppression d'un sujet
export const deleteSubjectValidation = Joi.object<DeleteSubjectRequest>({
  id: Joi.number().integer().required()
}).options({ abortEarly: false });

export interface DeleteSubjectRequest {
  id: number;
}
