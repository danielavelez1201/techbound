import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import find from 'find-up';
import path from 'path';
import session from 'express-session';
import http from 'http';
import userRouter from './routes/users';
import signupRouter from './routes/signup';
import emailRouter from './routes/email';

const envPath = find.sync(".env");
dotenv.config({path: envPath});

const validateEnv = () => {
    // TODO: Validate the env keys.
}

// The client code *must* be built before the server starts.
const appBundleDir = path.resolve(__dirname, "..", "..", "client", "build");

const createHttpServer = async (): Promise<http.Server> => {
    validateEnv();
    const app = express();
  
    app.use(express.urlencoded({extended: true}));
    app.use(session({
        secret: "CHANGETHIS",
        resave: false,
        saveUninitialized: true,
    }));
    app.use("/users", userRouter);
    app.use("/signup", signupRouter);
    app.use("/email", emailRouter);
    app.use(express.static(appBundleDir));
    // TODO: The origin should be an env variable.
    app.use(cors({credentials: true, origin: "http://localhost:3000"}));
    app.use("*", (_, res) => {
        res.sendFile(path.resolve(appBundleDir, "public", "index.html"));
    }); 
    return new http.Server(app);
}


export default createHttpServer;
