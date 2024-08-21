const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const express = require('express');
const app = express()

dotenv.config();
// Access your API key as an environment variable 
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const CVprompt = "Write a cv fore frontend dev caled abdulrhman use html notation and in line css with cool colerd background"
const testPrompt = "Write a  childern book   "
const startPrompt = "Write a chat bot server home bage and  use html notation and in line css with cool gradint anmated colord background"

const resultMess = null ; 

// app.get("./api",(req,res)=>{

//      resultMess = response.text();
//      model.generateContent(prompt).then(()=>{
//         const response =  result.response;
//         console.log("MMMMMMMMMMMMMMMM<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>",response);
//         const text = response.text();
//         resultMess = response
//         console.log(text);
//         res.send(resultMess)
//      });

// })
app.get('/api', (req, res) => {
 
  model.generateContent(CVprompt).then((result)=>{
            const response =  result.response;
            console.log("MMMMMMMMMMMMMMMM<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>",response);
            const text = response.text();
         
            console.log(text);
            res.send({"data":text})
         });
});

app.get('/test', (req, res) => {
 
  model.generateContent(testPrompt).then((result)=>{
            const response =  result.response;
            console.log("0000000000000000000000000000000000000000000000000000000000000xxxxxxxxxxxxxxxxxxxx",response);
            const text = response.text();
         
            console.log(text);
            res.send({"data":text})
         });
});

app.get('/', (req, res) => {
 
  model.generateContent(startPrompt).then((result)=>{
            const response =  result.response;
            console.log("MMMMMMMMMMMMMMMM<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>",response);
            const text = response.text();
         
            console.log(text);
            res.send(text)
         });
});
// async function run() { 
   //     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     console.log("MMMMMMMMMMMMMMMM<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>",response);
//     const text = response.text();
//     console.log(text);
//   }
  
//   run();
app.listen(3333,()=>console.log("oo swevire run at deafult port 2222 3333 2222"))