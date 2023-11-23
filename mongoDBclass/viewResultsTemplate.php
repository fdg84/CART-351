<?php 

require_once __DIR__ . '/vendor/autoload.php';

try {
 
    //1: connect to mongodb atlas
    $client = 
    new MongoDB\Client(
        "mongodb+srv://fdg:4WNStEi6VbJEEo0Y@cart351.0am5ako.mongodb.net/?retryWrites=true&w=majority"
     
    );

    $collection = $client->CART351->GalleryItems;

    echo("valid connection");
    echo("<br>");





}
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
?>