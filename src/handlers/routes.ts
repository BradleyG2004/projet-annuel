import express, { Request, Response } from "express";
import { AppDataSource } from "../database/database";
import { generateValidationErrorMessage } from "./validators/generate-validation-message.ts";
import { MissionUsecase } from "../domain/mission-usecase";
import { ListMissionRequest, MissionRequest, listMissionValidation, missionValidation } from "./validators/mission-validator";
import { EvenementUsecase } from "../domain/evenement-usecase";
import { EvenementRequest, ListEvenementRequest, evenementValidation } from "./validators/evenement-validator";

export const initRoutes = (app: express.Express) => {
         app.get("/health", (req: Request, res: Response) => {
            res.send({ "message": "hello world" })
        })
   
        const missionUsecase = new MissionUsecase(AppDataSource);
        const evenementUsecase = new EvenementUsecase(AppDataSource);

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

}
