const express = require('express');
const https = require('https');


const app = express();



app.get("/" , (req,res) =>{
  res.sendFile( __dirname + "/index.html");
  let data = ' ';
  https.get("https://api.dictionaryapi.dev/api/v2/entries/en/hello/", (response) => {
    response.on("data" , (chunk) => {
      data += chunk;
    });
    response.on('end' , () => {
      let parsed  = JSON.parse(data);
      console.log(parsed);
      // res.send(parsed);
    });

  });


});


app.listen(3000 ,() =>{
  console.log("Server is up and running on port 3000");
});
