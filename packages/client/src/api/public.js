import 'isomorphic-fetch';

const ROOT_URL = 'http://localhost:5000';

async function sendRequest(path, options = {}) {  
    const headers = {    
        'Content-type': 'application/json; charset=UTF-8', 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
    };
    const response = await fetch(
        `${ROOT_URL}${path}`,    
        Object.assign({ method: 'POST', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type' }, 
        { headers }, options),
    );
    const data = await response.json();
    if (data.error) {    
        throw new Error(data.error);
    }
    return data;
}

export const sendEmail = email => {
    console.log("sendEmail", JSON.stringify({ email }));
    sendRequest('/email/api/v1/public/sendEmail', {    
        body: JSON.stringify({ email }),  
    }); 
    console.log("sendRequest", sendRequest('/email/api/v1/public/sendEmail', {    
        body: JSON.stringify({ email }),  
    }))
} 
    



