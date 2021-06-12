const emailrequest = require('request');

async function send({ email }) {  
    const data = {    
        email_address: email,    
        status: 'sent',  
    };
    await new Promise((resolve, reject) => {    
        emailrequest.request.post(      
            {        
                uri: `https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,      
                headers: {          
                    Accept: 'application/json',          
                    Authorization: `Basic ${Buffer.from(`apikey:${API_KEY}`).toString('base64')}`,        
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

module.exports = send;