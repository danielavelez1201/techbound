const request = require('request');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

async function send({ email }) {  
    console.log("hi", process.env.API_KEY);
    const data = {    
        email_address: email,    
        status: 'pending',  
    };
    await new Promise((resolve, reject) => {
        console.log("pinky promise");
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
                    console.log("big resolve", Buffer.from(`apikey:${process.env.API_KEY}`).toString('base64'));  
                    console.log(response);
                }      
            },    
        );  
    });
}

module.exports = { send };