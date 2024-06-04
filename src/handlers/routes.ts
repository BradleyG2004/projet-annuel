import { Router} from 'express';
import { validationMiddleware } from './validators/validationMiddleware';
import {
  createVoteValidation,
  getVoteValidation,
  updateVoteValidation,
  deleteVoteValidation,
  CreateVoteRequest,
  GetVoteRequest,
  UpdateVoteRequest,
  DeleteVoteRequest
}from './validators/voteValidator';

import {
  createResponseValidation,
  getResponseValidation,
  updateResponseValidation,
  CreateResponseRequest,
  GetResponseRequest,
  UpdateResponseRequest,
  DeleteResponseRequest,
  deleteResponseValidation
}from './validators/responseValidator';

const router = Router();

router.post('/votes', validationMiddleware(createVoteValidation), (req, res) =>{
  res.send('Vote créé');
});

router.get('/votes/:id', validationMiddleware(getVoteValidation), (req, res) => {
  res.send('Vote lu');
});

router.put('/votes/:id', validationMiddleware (updateVoteValidation), (req, res) =>{
  res.send('Vote mis à jour');
});

router.delete('/votes/:id', validationMiddleware(deleteVoteValidation), (req, res)=> {
  res.send('Vote supprimé');
});

// créer une reponse

router.post('/responses', validationMiddleware (createResponseValidation), (req, res) =>{
  res.status(200).send({message:'Réponse créée'});
});
//lire une reponse
router.get('/responses/:id', validationMiddleware(getResponseValidation), (req, res) =>{
  res.status(200).send({message:'Réponse lue'});
});

//mettre à jour une reponse
router.put('/response/id', validationMiddleware(updateResponseValidation), (req, res) =>{
  res.send('Reponse mise à jour');
});

//suppression d'une reponse
router.delete('/response/id', validationMiddleware(deleteResponseValidation), (req, res) =>{
  res.send('Reponse supprimée');
});

export default router;
