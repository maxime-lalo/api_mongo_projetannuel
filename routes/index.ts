import {Express} from "express";
import bidRouter from './bid.route';

export function buildRoutes(app: Express) {
    app.use("/bid",bidRouter);
}