import express from 'express';
import mailchimp from '../util/mailchimp';

const send = mailchimp.send;
const emailRouter = express.Router();

emailRouter.route("/api/v1/public/sendEmail").post(async (req, res) => {
    const { email } = req.body
    if (!email) {    
        res.json({ error: 'Email is required' });    
        return;  
    }    
    try {
        await send({ email });
        res.json({ sent: 1 });    
        console.log("router", email);
    } catch (err) {    
        res.json({ error: err.message || err.toString() });  
    }
});

export default emailRouter;