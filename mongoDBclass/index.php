<?php 
// include the composer library
require_once __DIR__ . '/vendor/autoload.php';

try {
 
    //1: connect to mongodb atlas
    $client = 
    new MongoDB\Client(
        "mongodb+srv://fdg:4WNStEi6VbJEEo0Y@cart351.0am5ako.mongodb.net/?retryWrites=true&w=majority"
     
    );
    echo("valid connection");
    echo("<br>");
     
    //2: connect to collection (that exists):
    $collection = $client->CART351->GalleryItems;
    //echo($collection);
     
    
    //3: insert into the collection
    $insertOneResult = $collection->insertOne([
        'artist' => 'test artist',
        'title' => 'untitled',
        'location' => 'montreal',
    ]);
     
    printf("Inserted %d document(s)\n", $insertOneResult->getInsertedCount());
    var_dump($insertOneResult->getInsertedId());
    }
    catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }

?>