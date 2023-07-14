const button = document.querySelector(".btn");
const input = document.querySelector(".wordSearch");

button.addEventListener("click" , function(){
  var word = input.value;
  console.log(word);
  let fixedUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word + "/";
  fetch(fixedUrl)
.then(x => x)
.then(y => console.log(y));
});
