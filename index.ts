import {config} from "dotenv";
config();
import express from "express";
import {buildRoutes} from "./routes";
import cors from 'cors';

const app = express();

app.use(express.json());
const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

buildRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Listening on ${port}...`);
})