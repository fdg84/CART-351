<?php
if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['submitSearch']))
{
//NEW open a the db and add in the try and catch
// get the contents from the db and output. ..
try {
    require_once __DIR__ . '/vendor/autoload.php';
 
// //1: connect to mongodb atlas
$client = 
new MongoDB\Client(
    'mongodb+srv://fdg:4WNStEi6VbJEEo0Y@cart351.0am5ako.mongodb.net/?retryWrites=true&w=majority'
 
);

//2: connect to collection (that exists):
$collection = $client->CART351->GalleryItems;
// get the search field
$searchField = $_GET["a_search"];
//make the request
$resultObject = $collection->find(['artist'=>$searchField]);

$arrayToReturn = [];
foreach($resultObject as $galleryItem){
    $myPackagedData=new stdClass();
    foreach($galleryItem as $key => $value)
    {
        if($key =="creationDate"){
            $dateTime = $value->toDateTime();
            $myPackagedData->$key =$dateTime->format('r');
 
        }
        else if($key!="_id"){
        $myPackagedData->$key =$value;
        }
    }
    $arrayToReturn[]=$myPackagedData;
}
echo(json_encode($arrayToReturn));


// $myPackagedData=new stdClass();
// $myPackagedData->response ="success";
// $testObj = json_encode($myPackagedData);
echo($testObj);
exit;
}//END TRY
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
}//GET
 
?>


<html>
<head>
<title>Retrieve Results  USING FETCH </title>
<!--set some style properties::: -->
<link rel="stylesheet" type="text/css" href="css/galleryStyle.css">
</head>
<body>
<div class= "searchFormContainer">
<h1> SEARCH & VIEW</h1>
<form id="searchForm" action="">
<p>Search By Artist: <input type="text" size="24" maxlength = "40" name = "a_search" id = "a_search">
<input type = "submit" name = "submit" value = "submit my info" id ="buttonSearch" /></p>
</form>
</div>
  <!-- NEW for the result -->
<div id = "result"></div>
 
<script>
    window.onload = function (){
        console.log("ready");

        window.onload = function (){
        console.log("ready");
        document.querySelector("#searchForm").addEventListener("submit", function(){
            event.preventDefault();
            console.log("button clicked");
            console.log("form has been submitted");
            let formData = new FormData(document.querySelector("#searchForm"));
            formData.append("submitSearch","extraTest");
            /* excellent function */
            const queryString = new URLSearchParams(formData).toString();
 
            fetch("viewAndSearchMongo.php/?"+queryString)
           .then(function (response) {
            return response.json();
          })
          .then(function (jsonData) {
          console.log(jsonData);
          //displayResponse(jsonData);
        });
 
        })
/*** THIS IS THE OLD DISPLAY FUNCTION **/
 function displayResponseOld(theResult){
      let container = document.createElement("div");
      container.classList.add("outer");
      document.querySelector("#result").appendChild(container);
 
      let title = document.createElement("h3");
      title.textContent= "Results from user";
      container.appendChild(title);
 
      let contentContainer = document.createElement("div");
      contentContainer.classList.add("content");
      container.appendChild(contentContainer);
 
      for (let property in theResult) {
        console.log(property);
        if(property ==="fileName"){
          let img = document.createElement("img");
          img.setAttribute('src','images/'+theResult[property]);
          contentContainer.appendChild(img);
        }
        else if(property!=="response"){
          let para = document.createElement('p');
         para.textContent = property+"::" +theResult[property];
            contentContainer.appendChild(para);
        }
 
      }

      
 
 
    }
}
function displayResponse(theResult){
 
    document.querySelector("#result").innerHTML ="";
    let back = document.createElement("div");
    back.id ="back";
    let title = document.createElement("h3");
    title.textContent= "Results from user";
     document.querySelector("#result").appendChild(title);
     document.querySelector("#result").appendChild(back);
 
 
      for(let i =0; i< theResult.length; i++){
 
     let container = document.createElement("div");
      container.classList.add("outer");
      back.appendChild(container);
 
      let contentContainer = document.createElement("div");
      contentContainer.classList.add("content");
     container.appendChild(contentContainer);
 
      for (let property in theResult[i]) {
        console.log(property);
 
         if(property!=="imagePath"){
          let para = document.createElement('p');
         para.textContent = property+"::" +theResult[i][property];
 
         contentContainer.appendChild(para);
        }
 
      }
          let img = document.createElement("img");
          img.setAttribute('src',theResult[i]["imagePath"]);
          container.appendChild(img);
    } //outer for
  }



      };
 
</script>
</body>
</html>