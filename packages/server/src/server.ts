import express from 'express';
import cors from 'cors';
import { mongoose } from '@typegoose/typegoose';
import dotenv from 'dotenv';
import logger from "morgan";
import find from 'find-up';
import path from 'path';
import session from 'express-session';
import http from 'http';
import userRouter from './routes/users';
import signupRouter from './routes/signup';
import emailRouter from './routes/email';


const envPath = find.sync(".env");
dotenv.config({path: envPath});

/**
 * Verifies that the environment has the correct keys.
 * Crashes if verification fails.
 */
const validateEnv = () => {
    const REQUIRED_KEYS = ["MONGO_URI", "SESSION_SECRET"];
    REQUIRED_KEYS.map((k) => {
        if (process.env[k] === undefined) {
            throw new Error(`Missing environment key ${k}`);
        }
    });
}

// The client code *must* be built before the server starts.
const appBundleDir = path.resolve(__dirname, "..", "..", "client", "build");

const createHttpServer = async (): Promise<http.Server> => {
    validateEnv();

    const app = express();
    app.use(express.urlencoded({extended: true}));
    app.use(express.json({}));
    // Nice HTTP logging.
    app.use(logger("dev", { skip: () => process.env.NODE_ENV === "test" }));
    app.use(session({
        secret: String(process.env.SESSION_SECRET),
        resave: false,
        saveUninitialized: true,
    }));
    app.use(cors({credentials: true, origin: "http://localhost:3000"}));
    
    // *ADD ROUTES HERE* 
    app.use("/users", userRouter);
    app.use("/signup", signupRouter);
    app.use("/email", emailRouter);

    // Serves client assets.
    app.use(express.static(appBundleDir));

    // This *needs* at the end.
    app.use("*", (_, res) => {
        res.sendFile(path.resolve(appBundleDir, "public", "index.html"));
    }); 

    return mongoose.connect(String(process.env.MONGO_URI), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => {
        return new http.Server(app);
    });
}


export default createHttpServer;
