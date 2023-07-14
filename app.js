const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
// const ejs = require('ejs');



const app = express();

// used bodyParser
app.use(bodyParser.urlencoded({extended : false}));


// incluede ejs
app.set("view-engine" , "ejs");


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
  let formWord = req.body.word;
  let fixedUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  let data = await makeRequest(fixedUrl + formWord + "/");
  if(data === "error"){
    res.send("Error occured");
    return;
  }
  let parsedData = JSON.parse(data);
  if (parsedData.length === 0 || !parsedData[0] ) { // || !parsedData[0].word || !parsedData[0].meanings
    res.send("No information found");
    return;
  }
  // console.log(parsedData);
  let givenWord = parsedData[0].word;
  let meaning = parsedData[0].meanings[0].definitions[0].definition;
  res.send(` The given word is: <br>${givenWord}<br><br>Its meaning is: <br>${meaning}` );

  // let word = parsedData[0].word;
  // console.log(word);

} );


app.listen(3000 ,() =>{
  console.log("Server is up and running on port 3000");
});
