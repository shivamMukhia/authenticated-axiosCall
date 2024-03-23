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
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
try {
const response = await axios.get("https://secrets-api.appbrewery.com/random");
const data=response.data;
const stringData=JSON.stringify(data);
// console.log(JSON.stringify(data));
// console.log('object', data);
res.render('index.ejs', {content: stringData});
}catch (error) {
console.log(error);
}
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
try {
const response = await axios.get(' https://secrets-api.appbrewery.com/all?page=1',{
auth: {
username:yourUsername,
password:yourPassword,
}
})
// console.log("resonse >>", response);
const data=JSON.stringify(response.data);
res.render('index.ejs',{content:data});
}catch (error) {
console.log(error);
}

});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
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

}
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
 try {
const response = await axios.get(' https://secrets-api.appbrewery.com/secrets/42',{
  headers:{
    'Authorization':`Bearer ${yourBearerToken}`,
  }
})
// console.log('token authorization, ', response);
const data = JSON.stringify(response.data);
res.render('index.ejs',{content:data});
 } catch (error ) {
  console.log(error);
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
