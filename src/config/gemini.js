
// gemini.js is a Node.js script that utilizes the Google Generative AI SDK to interact with a generative AI model called "gemini-1.5-flash." This script sets up the AI model, configures generation parameters, applies safety settings, and defines a function to run the model with a given input prompt.

// const apiKey = "AIzaSyDuBSuN2Oo-AdmvxnST9C1VAFVrgpxUq-8";

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

// object = A collection of related properties //object ={key:value}
// method: function that belongs to an object

// used to extract specific properties from an object returned by require("@google/generative-ai") and assign them to variables.



import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"
  
  const apiKey = "AIzaSyDuBSuN2Oo-AdmvxnST9C1VAFVrgpxUq-8";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

// Async makes a function return a promise
// Await makes an async function wait for a promise //Async and Await must be used together  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    // const result = await chatSession.sendMessage(prompt);
    // console.log(result.response.text());
    // return response.text();
    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text(); // Extract text from the response
    // console.log(result.response.text());
    console.log(responseText);
    return responseText; // Return the extracted text
  }
  
  export default run;