<!DOCTYPE html>
<head>
<title> Output from the Animal Gallery Database </title>
<link rel='stylesheet' type='text/css' href='css/galleryStyle.css'>
</head>
<body>
<?php
// get the contents from the db and output. ..
try {
    require_once __DIR__ . '/vendor/autoload.php';
 
 
//1: connect to mongodb atlas
$client = 
new MongoDB\Client(
    'mongodb+srv://fdg:4WNStEi6VbJEEo0Y@cart351.0am5ako.mongodb.net/?retryWrites=true&w=majority'

 
);
echo("valid connection");
echo("<br>");
//2: connect to collection (that exists):
$collection = $client->CART351->GalleryItems;

// $updatedGalleryItem= $collection->findOneAndUpdate(
//     [ 'title' => 'tweet' ],
//     [ '$set' => [ 'descript'=> 'a more precise description' ]]
 
// );

// var_dump($updatedGalleryItem);

//////////

// $updatedGalleryItem_points = $collection-> findOneAndUpdate(
//     ["user" => "marie" ],
//     ['$inc' => ["points" => 2 ] ]
// );
 
// var_dump($updatedGalleryItem_points);

//////////

// $updatedGalleryItem_3= $collection->findOneAndUpdate(
//     [ 'artist' => 'Sarah' ],
//     [ '$set' => [ 'descript'=> 'a more precise description for sarah' ]]
 
// );
// var_dump($updatedGalleryItem_3);

//////////

$updatedGalleryItems= $collection->updateMany(
    [ 'artist' => 'Sarah' ],
    [ '$set' => ['descript'=> 'a more precise description for all sarahs' ,'title'=> 'test 123']]
 
);
var_dump($updatedGalleryItems);



}

 
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
 
?>
</body>
</html>