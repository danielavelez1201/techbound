import 'dotenv/config'
import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../models/User.js';
import jwt from "jsonwebtoken";


const signupRouter = express.Router();

signupRouter.route('/').post(async (req, res) => {
    const data = req.body;
    const formData = req.body;
    const hash = await bcrypt.hash(formData.password, 10)
    const user = new User({
      "firstname": formData.firstname,
      "lastname": formData.lastname,
      "email": formData.email,
      "password": hash,
      "confirmation": hash,
      "linkedin": formData.linkedin,
      "github": formData.github,
      "clusters": [formData.cluster1, formData.cluster2, formData.cluster3]});
  
    user.save()
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
  
      //jwt payload
      payload = {
        user: {
          email: user.email,
          userId: user._id,
        },
      };
      //jwt signature
      let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
        expiresIn: "1h",
      });
      //Send authorization token
      return res.status(200).json({
        token: jwtToken,
      });
    })
  
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
      console.log(error);
    });

    
})

export default signupRouter;
