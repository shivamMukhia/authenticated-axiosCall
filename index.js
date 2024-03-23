import express, { json } from "express";
import axios from "axios";

const app = express();
const port = 3001;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "shivam404";
const yourPassword = "page not found";
const yourAPIKey = "5e9ecdce-ffdf-4695-8e1a-be383b382a49";
const yourBearerToken = "bcdb48c4-8067-47bb-b4ff-521d52fd3cc2";


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
try {
const response = await axios.get("https://secrets-api.appbrewery.com/random");
const data=response.data;
const stringData=JSON.stringify(data);
res.render('index.ejs', {content: stringData});
}catch (error) {
res.statusCode(404).send('Error: ',error.message);
}
});

app.get("/basicAuth", async (req, res) => {
try {
const response = await axios.get(' https://secrets-api.appbrewery.com/all?page=1',{
auth: {
username:yourUsername,
password:yourPassword,
}
})
const data=JSON.stringify(response.data);
res.render('index.ejs',{content:data});
}catch (error) {
res.statusCode(404).send("Error: ",error.message);
}

});

app.get("/apiKey", async (req, res) => {
try {
const response = await axios.get('https://secrets-api.appbrewery.com/filter',{
  params: {
    score:5,
    apiKey:yourAPIKey,
  }
})
const data=JSON.stringify(response.data);
res.render('index.ejs',{content:data});
}catch (error) {
res.statusCode(404).send("Error: ",error.message);
}
});

app.get("/bearerToken", async (req, res) => {
 try {
const response = await axios.get(' https://secrets-api.appbrewery.com/secrets/42',{
  headers:{
    'Authorization':`Bearer ${yourBearerToken}`,
  }
})
const data = JSON.stringify(response.data);
res.render('index.ejs',{content:data});
 } catch (error ) {
  res.statusCode(404).send('Error: ',error.message);
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
