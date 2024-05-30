import express, { Request, Response } from "express";
import { AppDataSource } from "../database/database";
import { generateValidationErrorMessage } from "./validators/generate-validation-message.ts";
import { MissionUsecase } from "../domain/mission-usecase";
import { ListMissionRequest, MissionRequest, listMissionValidation, missionValidation } from "./validators/mission-validator";
import { EvenementUsecase } from "../domain/evenement-usecase";
import { EvenementRequest, ListEvenementRequest, evenementValidation } from "./validators/evenement-validator";
import { ProjetUsecase } from "../domain/projet-usecase";
import { ListProjetRequest, ProjetRequest, listProjetValidation, projetValidation } from "./validators/projet-validator";
import { StepUsecase } from "../domain/step-usecase";
import { ListStepRequest, StepRequest, listStepValidation, stepValidation } from "./validators/step-validator";
import { ReviewUsecase } from "../domain/review-usecase";
import { ReviewRequest, reviewValidation } from "./validators/review-validator";
import { ComplianceUsecase } from "../domain/compliance-usecase";
import { ComplianceRequest, ListComplianceRequest, complianceValidation, listComplianceValidation } from "./validators/compliance-validator";

export const initRoutes = (app: express.Express) => {
         app.get("/health", (req: Request, res: Response) => {
            res.send({ "message": "hello world" })
        })
   
        const missionUsecase = new MissionUsecase(AppDataSource);
        const evenementUsecase = new EvenementUsecase(AppDataSource);
        const projetUsecase = new ProjetUsecase(AppDataSource);
        const stepUsecase = new StepUsecase(AppDataSource);
        const reviewUsecase = new ReviewUsecase(AppDataSource);
        const complianceUsecase = new ComplianceUsecase(AppDataSource);

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         app.post("/missions", async (req: Request, res: Response) => {
            const validation = missionValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { starting, ending, description }: MissionRequest = validation.value;
            try {
                const missionCreated = await missionUsecase.createMission(starting, ending, description);
                res.status(201).send(missionCreated);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.get("/missions/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const mission = await missionUsecase.getMission(id);
                if (!mission) {
                    res.status(404).send({ error: "Mission not found" });
                    return;
                }
                res.status(200).send(mission);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
    
        app.put("/missions/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            const validation = missionValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { starting, ending, description }: MissionRequest = validation.value;
            try {
                const mission = await missionUsecase.updateMission(id, { starting, ending, description });
                if (!mission) {
                    res.status(404).send({ error: "Mission not found" });
                    return;
                }
                res.status(200).send(mission);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
    
        app.delete("/missions/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const success = await missionUsecase.deleteMission(id);
                if (!success) {
                    res.status(404).send({ error: "Mission not found" });
                    return;
                }
                res.status(204).send();
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
    
        app.get("/missions", async (req: Request, res: Response) => {
            const validation = listMissionValidation.validate(req.query);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { page = 1, limit = 10 }: ListMissionRequest = validation.value;
            try {
                const result = await missionUsecase.listMissions({ page, limit });
                res.status(200).send(result);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Routes for Evenement
        app.post("/evenements", async (req: Request, res: Response) => {
            const validation = evenementValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { type, location, description, quorum, starting, ending, missionId }: EvenementRequest = validation.value;
            try {
                const evenementCreated = await evenementUsecase.createEvenement(type, location, description, quorum, starting, ending, missionId);
                res.status(201).send(evenementCreated);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.get("/evenements/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const evenement = await evenementUsecase.getEvenement(id);
                if (!evenement) {
                    res.status(404).send({ error: "Evenement not found" });
                    return;
                }
                res.status(200).send(evenement);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.put("/evenements/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            const validation = evenementValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { type, location, description, quorum, starting, ending, missionId }: EvenementRequest = validation.value;
            try {
                const evenement = await evenementUsecase.updateEvenement(id, { type, location, description, quorum, starting, ending, missionId });
                if (!evenement) {
                    res.status(404).send({ error: "Evenement not found" });
                    return;
                }
                res.status(200).send(evenement);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });    
        app.delete("/evenements/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const success = await evenementUsecase.deleteEvenement(id);
                if (!success) {
                    res.status(404).send({ error: "evenement not found" });
                    return;
                }
                res.status(204).send();
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.get("/evenements", async (req: Request, res: Response) => {
            const validation = listMissionValidation.validate(req.query);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { page = 1, limit = 10 }: ListEvenementRequest = validation.value;
            try {
                const result = await evenementUsecase.listEvenements({ page, limit });
                res.status(200).send(result);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        app.post("/projets", async (req: Request, res: Response) => {
            const validation = projetValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { description, starting, ending }: ProjetRequest = validation.value;
            try {
                const projetCreated = await projetUsecase.createProjet(description, starting, ending);
                res.status(201).send(projetCreated);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.get("/projets/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const projet = await projetUsecase.getProjet(id);
                if (!projet) {
                    res.status(404).send({ error: "Projet not found" });
                    return;
                }
                res.status(200).send(projet);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.put("/projets/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            const validation = projetValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { description, starting, ending }: ProjetRequest = validation.value;
            try {
                const projet = await projetUsecase.updateProjet(id, { description, starting, ending });
                if (!projet) {
                    res.status(404).send({ error: "Projet not found" });
                    return;
                }
                res.status(200).send(projet);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.delete("/projets/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const success = await projetUsecase.deleteProjet(id);
                if (!success) {
                    res.status(404).send({ error: "Projet not found" });
                    return;
                }
                res.status(204).send();
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.get("/projets", async (req: Request, res: Response) => {
            const validation = listProjetValidation.validate(req.query);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { page = 1, limit = 10 }: ListProjetRequest = validation.value;
            try {
                const result = await projetUsecase.listProjets({ page, limit });
                res.status(200).send(result);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
    
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            app.post("/steps", async (req: Request, res: Response) => {
                const validation = stepValidation.validate(req.body);
                if (validation.error) {
                    res.status(400).send(generateValidationErrorMessage(validation.error.details));
                    return;
                }
        
                const { state, description, starting, ending, projetId, missionId }: StepRequest = validation.value;
                try {
                    const stepCreated = await stepUsecase.createStep(state, description, starting, ending, projetId, missionId);
                    res.status(201).send(stepCreated);
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ error: "Internal error" });
                }
            });
            app.get("/steps/:id", async (req: Request, res: Response) => {
                const id = parseInt(req.params.id);
                try {
                    const step = await stepUsecase.getStep(id);
                    if (!step) {
                        res.status(404).send({ error: "Step not found" });
                        return;
                    }
                    res.status(200).send(step);
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ error: "Internal error" });
                }
            });
            app.put("/steps/:id", async (req: Request, res: Response) => {
                const id = parseInt(req.params.id);
                const validation = stepValidation.validate(req.body);
                if (validation.error) {
                    res.status(400).send(generateValidationErrorMessage(validation.error.details));
                    return;
                }
        
                const { state, description, starting, ending, projetId, missionId }: StepRequest = validation.value;
                try {
                    const step = await stepUsecase.updateStep(id, { state, description, starting, ending, projetId, missionId });
                    if (!step) {
                        res.status(404).send({ error: "Step not found" });
                        return;
                    }
                    res.status(200).send(step);
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ error: "Internal error" });
                }
            });
            app.delete("/steps/:id", async (req: Request, res: Response) => {
                const id = parseInt(req.params.id);
                try {
                    const success = await stepUsecase.deleteStep(id);
                    if (!success) {
                        res.status(404).send({ error: "Step not found" });
                        return;
                    }
                    res.status(204).send();
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ error: "Internal error" });
                }
            });
        
            app.get("/steps", async (req: Request, res: Response) => {
                const validation = listStepValidation.validate(req.query);
                if (validation.error) {
                    res.status(400).send(generateValidationErrorMessage(validation.error.details));
                    return;
                }
        
                const { page = 1, limit = 10 }: ListStepRequest = validation.value;
                try {
                    const result = await stepUsecase.listSteps({ page, limit });
                    res.status(200).send(result);
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ error: "Internal error" });
                }
            });
        
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            
          app.post("/comments", async (req: Request, res: Response) => {
            const validation = reviewValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { content, createdAt, missionId, userId }: ReviewRequest = validation.value;
            try {
                const reviewCreated = await reviewUsecase.createReview(content, createdAt, missionId, userId);
                res.status(201).send(reviewCreated);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
    
        app.get("/comments/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const review = await reviewUsecase.getReview(id);
                if (!review) {
                    res.status(404).send({ error: "Review not found" });
                    return;
                }
                res.status(200).send(review);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.put("/comments/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            const validation = reviewValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { content }: ReviewRequest = validation.value;
            try {
                const review = await reviewUsecase.updateReview(id, { content });
                if (!review) {
                    res.status(404).send({ error: "Review not found" });
                    return;
                }
                res.status(200).send(review);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });

        app.delete("/comments/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const success = await reviewUsecase.deleteReview(id);
                if (!success) {
                    res.status(404).send({ error: "Review not found" });
                    return;
                }
                res.status(204).send();
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        app.post("/compliances", async (req: Request, res: Response) => {
            const validation = complianceValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { description, status, userId, missionId }: ComplianceRequest = validation.value;
            try {
                const complianceCreated = await complianceUsecase.createCompliance(description, status, userId, missionId);
                res.status(201).send(complianceCreated);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.get("/compliances/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const compliance = await complianceUsecase.getCompliance(id);
                if (!compliance) {
                    res.status(404).send({ error: "Compliance not found" });
                    return;
                }
                res.status(200).send(compliance);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.put("/compliances/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            const validation = complianceValidation.validate(req.body);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { description, status }: ComplianceRequest = validation.value;
            try {
                const compliance = await complianceUsecase.updateCompliance(id, { description, status });
                if (!compliance) {
                    res.status(404).send({ error: "Compliance not found" });
                    return;
                }
                res.status(200).send(compliance);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
        app.delete("/compliances/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            try {
                const success = await complianceUsecase.deleteCompliance(id);
                if (!success) {
                    res.status(404).send({ error: "Compliance not found" });
                    return;
                }
                res.status(204).send();
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
    
        app.get("/compliances", async (req: Request, res: Response) => {
            const validation = listComplianceValidation.validate(req.query);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
    
            const { page = 1, limit = 10 }: ListComplianceRequest = validation.value;
            try {
                const result = await complianceUsecase.listCompliances({ page, limit });
                res.status(200).send(result);
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: "Internal error" });
            }
        });
    
    

    }
