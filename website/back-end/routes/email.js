const router = require('express').Router();
const mailchimp = require("../util/mailchimp");

router.route("/api/v1/public/sendEmail").post(async (req, res) => {
    const { email } = req.body
    if (!email) {    
        res.json({ error: 'Email is required' });    
        return;  
    }    
    try {    
        await mailchimp.send({ email });
        res.json({ sent: 1 });    
        console.log(email);  
    } catch (err) {    
        res.json({ error: err.message || err.toString() });  
    }
});

module.exports = router;