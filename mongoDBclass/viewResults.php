<!DOCTYPE html>
<head>
<title> Output from the Animal Gallery Database </title>
<link rel='stylesheet' type='text/css' href='css/galleryStyle.css'>
</head>
<body>

<?php 

require_once __DIR__ . '/vendor/autoload.php';

try {
 
    //1: connect to mongodb atlas
    $client = 
    new MongoDB\Client(
        "mongodb+srv://fdg:4WNStEi6VbJEEo0Y@cart351.0am5ako.mongodb.net/?retryWrites=true&w=majority"
     
    );

    $collection = $client->CART351->GalleryItems;

    // echo("valid connection");
    // echo("<br>");

    // $result = $collection->findOne([]);

    //b: all results 
    $resultObject = $collection->find([]);
    //1: returns a MONGODB cursor object
    // var_dump($resultObject);

   

    // var_dump($result);
    // echo("</br>");
    // foreach($result as $key => $value)
    // {
    //   echo("key: ".$key." value: ".$value);
    //   echo("</br>");
     
    // }

    echo("</br>");
    echo "<h3> Query Results:::</h3>";
     
     echo"<div id='back'>";
     
    foreach($resultObject as $galleryItem){
     
        //go through each doc
     
    echo "<div class ='outer'>";
    echo "<div class ='content'>";
     
    foreach($galleryItem as $key => $value)
    {
     if($key!="imagePath" && $key!="creationDate"){
     
      echo("<p>".$key." ::" .$value."</p>");
     }
     
     if( $key=="creationDate"){
        $dateTime = $value->toDateTime();
        echo("<p>".$key." ::" .$dateTime->format('r')."</p>");
     
     }
     
     
    }
    //end content
     // put image in last
     echo "</div>";
     $imagePath = $galleryItem["imagePath"];
     echo "<img src = $imagePath \>";
     
    //end outer
    echo "</div>";
     
    }
    //end back
    echo "</div>";
}

catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
?>

</body>
</html>