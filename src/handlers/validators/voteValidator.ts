import Joi from 'joi';

export const createVoteValidation = Joi.object<CreateVoteRequest>({
  subject_id: Joi.number().required,
  user_id: Joi.number().integer().required(),
  vote: Joi.string().valid('up', 'down').required()
}).options({ abortEarly: false});

export interface CreateVoteRequest{
  subject_id: number;
  user_id: number;
  vote: string;
}

export const getVoteValidation = Joi.object<GetVoteRequest>({
  id: Joi.number().integer().required()
}).options({ abortEarly: false});

export interface GetVoteRequest{
  id: number;
}

export const updateVoteValidation = Joi.object<UpdateVoteRequest>({
  vote: Joi.string().valid('up', 'down').required()
}).options({ abortEarly: false});

export interface UpdateVoteRequest{
  vote: string;
}

export const deleteVoteValidation = Joi.object<DeleteVoteRequest>({
  id: Joi.number().integer().required()
}).options({abortEarly: false});

export interface DeleteVoteRequest{
  id: number;
}
