import Joi from 'joi';

// création d'un salaire
export const createSalaryValidation = Joi.object<CreateSalaryRequest>({
  employeeName: Joi.string().min(3).required(),
  amount: Joi.number().min(0).required()
}).options({ abortEarly: false });

export interface CreateSalaryRequest {
  employeeName: string;
  amount: number;
}

// lecture d'un salaire
export const getSalaryValidation = Joi.object<GetSalaryRequest>({
  id: Joi.number().integer().required()
}).options({ abortEarly: false });

export interface GetSalaryRequest {
  id: number;
}

// mise à jour d'un salaire
export const updateSalaryValidation = Joi.object<UpdateSalaryRequest>({
  employeeName: Joi.string().min(3).optional(),
  amount: Joi.number().min(0).optional()
}).options({ abortEarly: false });

export interface UpdateSalaryRequest {
  employeeName?: string;
  amount?: number;
}

// suppression d'un salaire
export const deleteSalaryValidation = Joi.object<DeleteSalaryRequest>({
  id: Joi.number().integer().required()
}).options({ abortEarly: false });

export interface DeleteSalaryRequest {
  id: number;
}
