import express from "express";
import { initRoutes } from "./handlers/routes";
 
import { AppDataSource } from './database/database';
 

const app = express();
const port = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log('well connected to database');
        initRoutes(app);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });
