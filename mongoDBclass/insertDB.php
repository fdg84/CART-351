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



$collection->insertMany([
    [
    'artist' => 'Sarah',
    'title' => 'cat',
    'creationDate' =>  new MongoDB\BSON\UTCDateTime(strtotime('2002-06-12')*1000),
    'geoLoc'=> 'Montreal',
    'descript'=> 'Description for the arts',
    'imagePath'=> 'images/cat_scratch.jpg'
    ],
    [
    'artist' => 'Sarah',
    'title' => 'tweet',
    'creationDate' => new MongoDB\BSON\UTCDateTime(strtotime('2005-06-13')*1000),
    'geoLoc'=> 'Toronto',
    'descript'=> 'Description for the arts',
    'imagePath'=> 'images/tweet.jpg'
    ],
    
    
    [
    'artist' => 'Sarah',
    'title' => 'whale',
    'creationDate' => new MongoDB\BSON\UTCDateTime(strtotime('2003-03-19')*1000),
    'geoLoc'=> 'Halifax',
    'descript'=> 'Description for the arts',
    'imagePath'=> 'images/sperm_whale.jpg'
    ],
    
    
    [
    'artist' => 'Stephen',
    'title' => 'bear',
    'creationDate' => new MongoDB\BSON\UTCDateTime(strtotime('1999-07-18')*1000),
    'geoLoc'=> 'Edinborough',
    'descript'=> 'Description for the arts',
    'imagePath'=> 'images/spectacled-bear.jpg'
    ],
    
    [
    'artist' => 'Stephen',
    'title' => 'devil',
    'creationDate' =>new MongoDB\BSON\UTCDateTime(strtotime('2000-05-06')*1000),
    'geoLoc'=> 'London',
    'descript'=> 'Description for the arts',
    'imagePath'=> 'images/tasmanian-devil.jpg'
    ],
    
    [
    'artist' => 'Harold',
    'title' => 'fox',
    'creationDate' => new MongoDB\BSON\UTCDateTime(strtotime('2012-10-21')*1000),
    'geoLoc'=> 'New York',
    'descript'=> 'Description for the arts',
    'imagePath'=> 'images/red-fox.jpg'
    ],
    [
    'artist' => 'Martha',
    'title' => 'tiger',
    'creationDate' => new MongoDB\BSON\UTCDateTime(strtotime('2017-08-21')*1000),
    'geoLoc'=> 'Paris',
    'descript'=> 'Description for the arts',
    'imagePath'=> 'images/sperm_whale.jpg'
    ]
    ]);

}
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
?>