import Joi from 'joi';

// création d'un document
export const createDocumentValidation = Joi.object<CreateDocumentRequest>({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(5).required()
}).options({ abortEarly: false });

export interface CreateDocumentRequest {
  title: string;
  content: string;
}

// lecture d'un document
export const getDocumentValidation = Joi.object<GetDocumentRequest>({
  id: Joi.number().integer().required()
}).options({ abortEarly: false });

export interface GetDocumentRequest {
  id: number;
}

// mise à jour d'un document
export const updateDocumentValidation = Joi.object<UpdateDocumentRequest>({
  title: Joi.string().min(3).optional(),
  content: Joi.string().min(5).optional()
}).options({ abortEarly: false });

export interface UpdateDocumentRequest {
  title?: string;
  content?: string;
}

// suppression d'un document
export const deleteDocumentValidation = Joi.object<DeleteDocumentRequest>({
  id: Joi.number().integer().required()
}).options({ abortEarly: false });

export interface DeleteDocumentRequest {
  id: number;
}
