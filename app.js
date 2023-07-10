const express = require('express');
const https = require('https');


const app = express();



app.get("/" , (req,res) =>{
  res.sendFile( __dirname + "/index.html");


});

function makeRequest(url){

  // Promise constructor is used to create a promise that wraps the asynchronous operation of making an HTTP request.
  return new Promise((resolve , reject) => {
     https.get(url, (response) => {
       let data = ' ';
      response.on("data" , (chunk) => {
        data += chunk;
      });

      // resolve and reject . resolve and reject are two functions that are provided as arguments to the executor function of a promise
      // resolve(value) is a function used to fulfill the promise. It accepts an optional value as an argument, which represents the eventual
      // result of the asynchronous operation. When resolve is called, the promise transitions from the pending state to the fulfilled state.
      response.on('end' , () => {
        resolve(data);

      });
      response.on('error' , (error) =>{
        reject(error);
      } );
    });
  });

}

app.post("/" , async (req,res) => {

  let parsedData = await makeRequest("https://api.dictionaryapi.dev/api/v2/entries/en/hello/");
  console.log(JSON.parse(parsedData));
  console.log("Hello");
  // res.send("This is from post request");
  res.send(JSON.parse(parsedData));

  // let word = parsedData[0].word;
  // console.log(word);

} );


app.listen(3000 ,() =>{
  console.log("Server is up and running on port 3000");
});
