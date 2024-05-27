import Joi from "joi";

export const evenementValidation = Joi.object<EvenementRequest>({
    type: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    quorum: Joi.number().required(),
    starting: Joi.date().iso().required(),
    ending: Joi.date().iso().required(),
    missionId: Joi.number().required()
}).options({ abortEarly: false });

export interface EvenementRequest {
    type: string;
    location: string;
    description: string;
    quorum: number;
    starting: Date;
    ending: Date;
    missionId: number;
}

export const listEvenementValidation = Joi.object<ListEvenementRequest>({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
});

export interface ListEvenementRequest {
    page?: number;
    limit?: number;
}
