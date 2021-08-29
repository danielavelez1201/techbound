import express from 'express';
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import authorize from '../middleware/auth';

const authRouter = express.Router();
const userSchema = User;

authRouter.post("/signin-user", (req, res, next) => {
    let getUser;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if( !user) {
            return res.status(401).json({
                message: "Auth Failed"
            });
        }
        getUser= user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Auth Failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiry: "2h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 6600,
            msg: getUser
        })
        .catch (err => {
            return res.status(401).json({
                message: "Auth failed",
            });
        });
    });
});

authRouter.route('/all-user').get(authorize, (req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error)
        }
        res.status(200).json(response)
    });
});

export default authRouter;