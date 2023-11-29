<?php
  if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $resultsOnSave = $_POST['resultsOnSave']; 
    $path = 'results.json';
    $fp = fopen($path, 'w');
    fwrite($fp, $resultsOnSave);
    fclose($fp);
    echo $resultsOnSave; 
    exit;
  } 
?>

<html>
  <head>
  <title>Pat Metheny Album Poll</title>
    <link rel="stylesheet" type="text/css" href="css/galleryStyle.css">
  </head>
  <body>
    <div>
      <div class="row">
      <div class="column">  
          <img class="albumImage" id="Letter From Home" name="letter" src = "albums/letter.jpg"></img>
        </div>  
        <div class="column">  
          <img class="albumImage" id="Offramp" name="offramp" src = "albums/offramp.jpg"></img>  
        </div>
        <div class="column">  
          <img class="albumImage" id="Travels" name="travels" src = "albums/travels.jpg"></img>
        </div>
      </div>
    </div>
    <div class= "formContainer">

      <form id="poll" action="" enctype ="multipart/form-data">
      <fieldset>
      
      <center>
          <p>
            <label>Album:</label><input type="text" size="24" maxlength = "40" name = "album" id="album" readonly>
            <input type="hidden" id="resultsOnSave" name="resultsOnSave">
          </p>

          <p class = "sub">
            <input type = "submit" name = "submit" value = "Submit" id ="buttonS" />
          </p>
          <div id = thanks hidden>
            <p>Thank you for submitting!</p>
          </div >
        </center> 
        </fieldset>

      </form>
    </div>

  <div id = "result">
    <center>  
      <p class="resultsArray" id="resultsArray"></p>
    </center>
  </div>

<script>
  let selected = ""
  let resultsOnLoad, resultsOnSave
  let hasVoted = false
  let votedString
  let titles = {letter: "Letter From Home", offramp: "Offramp", travels: "Travels"}
  
  // results.json
  //{"letter":0,"offramp":0,"travels":0}

  //  http://localhost:3000/Fetch.php
  
  function albumClick(e){
    selected = e.target.id
    album.value = e.target.id
    
    if(e.target.name !== votedString){
      if (votedString) {
        resultsOnSave[votedString] = resultsOnSave[votedString] - 1 
      }
      resultsOnSave[e.target.name] = resultsOnSave[e.target.name] + 1 
      votedString = e.target.name
      
      let resultsString = ""
      for (const [key, value] of Object.entries(resultsOnSave)) {
        resultsString += titles[key] + ': ' + value + ' '
      }
    
      document.getElementById('resultsArray').innerHTML = resultsString
      document.getElementById('resultsOnSave').value = JSON.stringify(resultsOnSave)
    }         
  }
  
  window.onload = function (){
        
    fetch('results.json')
    .then(function (response) {
            return response.json();
    }).then(result =>{
      let resultsString = ""
      for (const [key, value] of Object.entries(result)) {
        resultsString += titles[key] + ': ' + value + ' '
      }

      document.getElementById('resultsArray').innerHTML = resultsString
      resultsOnLoad = result
      resultsOnSave = result
    })
        
    document.querySelector("#poll").addEventListener("submit", function(){
      event.preventDefault();
      console.log("i selected", selected)
      let form = document.querySelector("#poll");
      let data = new FormData(form);
        
      fetch('Fetch.php', {
              method: 'POST',
              body: data
      })
      .then(function (response) {
        return response.json();
      }).then(result =>{
        document.getElementById('thanks').hidden = false
        setTimeout(() => {
          location.reload()
        }, 500)
      
      })
    })

    var letter = document.getElementById("Letter From Home");
    var offramp = document.getElementById("Offramp");
    var travels = document.getElementById("Travels");
    var album = document.getElementById("album");

    letter.addEventListener('click', (e) => albumClick(e)); 
    offramp.addEventListener('click', (e) => albumClick(e)); 
    travels.addEventListener('click', (e) => albumClick(e)); 

}
    </script>
  </body>
</html>