const request = require('request');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

async function send({ email }) {  
    const data = {    
        email_address: email,    
        status: 'subscribed',  
    };
    await new Promise((resolve, reject) => {
        request.post(      
            {        
                uri: `https://us1.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members`,      
                headers: {          
                    Accept: 'application/json',          
                    Authorization: `Basic ${Buffer.from(`apikey:${process.env.API_KEY}`).toString('base64')}`,        
                },        
                json: true,        
                body: data,      
            },      
            (err, response, body) => {        
                if (err) {          
                    reject(err);        
                } else {          
                    resolve(body);
                }      
            },    
        );  
    });
}

<<<<<<< HEAD
module.exports = send;
=======
module.exports = { send };
>>>>>>> bef977ec042e286f01cf9d47d22967a4afc5e70c
