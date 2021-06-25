const router = require('express').Router();
const send = require('../util/mailchimp').send;

router.route("/api/v1/public/sendEmail").post(async (req, res) => {
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

module.exports = router;