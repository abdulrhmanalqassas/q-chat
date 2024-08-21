const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const app = express() ;
app.use(bodyParser.json());


dotenv.config();
// Access your API key as an environment variable 
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const CVprompt = "Write a wibsite  for a teatcher  caled eng.amr elsi3idy use html notation and in line css with cool colerd background and swibe images with studint"
const testPrompt = "Write a  childern book   "
const startPrompt = "Write a chat bot server home bage and  use html notation and in line css with cool gradint anmated colord background"

const resultMess = null ; 


app.get('/api', (req, res) => {
 
  model.generateContent(CVprompt).then((result)=>{
            const response =  result.response;
            console.log("MMMMMMMMMMMMMMMM<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>",response);
            const text = response.text();
         
            console.log(text);
            res.send(text)
         });
});

app.post('/test', (req, res) => {
 const prompt = req.body.prompt
  model.generateContent(prompt).then((result)=>{
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