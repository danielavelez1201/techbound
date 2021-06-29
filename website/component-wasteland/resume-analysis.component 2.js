import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Resume() {
    const [output, setOutput] = useState("");
    const [openAI, setOpenAI] = useState("");
    const [loading, setLoading] = useState(true);

    const options = {
    method: 'POST',
    url: 'https://api.openai.com/v1/engines/davinci/completions',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer sk-iqw2evKypeGauAoB7OubhydgS6fxXrh2pQWJP9VI'
    },
    data: {prompt: 'Once upon a time', max_tokens: 5}
    };

    axios.request(options).then(function (response) {
    console.log(response.data);
    }).catch(function (error) {
    console.error(error);
    });
      
      
    /* useEffect(async () => {
        const result = await axios.get("http://localhost:8080/ping")
        setOutput(result.data);
 
        const openAIResult = await axios.request(options).then(function (response) {
            console.log(response.data);
            setOpenAI(response.data.choices.text);
          }).catch(function (error) {
            console.error(error);
          }).then(setLoading(false))
          
        
    }) */

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const fetcher = await axios.request(options)
            const response = await fetcher.data
            setOpenAI(response)
            setLoading(false)
        }
        fetchData()
    }, [])

    if (!loading) {
        console.log(openAI.choices.text)
    }

    return (
        loading? "Loading..." : <h1>{openAI.choices.text}</h1> 
    )
}

export default Resume;