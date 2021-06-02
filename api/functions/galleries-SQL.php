<?php

//error_reporting(-1);
//ini_set('display_errors', true);
//
//$config = array(
//    'host'     => 'db5001998845.hosting-data.io',
//    'user'     => 'dbu746778',
//    'pass'     => '#JCP_db_2021#',
//    'database' => 'dbs1630930'
//);
//
///* The PDO object */
//$pdo = NULL;
//
///* The connection string. */
//$dsn = 'mysql:host='.$config['host'].';dbname='.$config['database'].';charset=utf8';
//
///* Connection step. */
//try
//{
//    $pdo = new PDO($dsn, $config['user'],  $config['pass']);
//    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//}
//catch (PDOException $e)
//{
//    die();
//}
//
///* The PHP array with the data for the JSON object. */
//$data = array();
//
///* Run the search query. */
//$galleriesQuery = 'SELECT id, name FROM galleries';
//$galleriesParams = array();
//
//try
//{
//    $galleriesRes = $pdo->prepare($galleriesQuery);
//    $galleriesRes->execute($galleriesParams);
//}
//catch (PDOException $e)
//{
//    echo $e;
//    die();
//}
//
//$i = 0;
///* Save the information to the $data array. */
//while (is_array($galleriesRow = $galleriesRes->fetch(PDO::FETCH_ASSOC)))
//{
//    $data[$i]['id'] = $galleriesRow['id'];
//    $data[$i]['title'] = $galleriesRow['name'];
//
//    $imagesQuery = 'SELECT url FROM images WHERE gallerieid = :gallerieid ORDER BY created_at ASC';
//    $imagesParams = array('gallerieid' => $data[$i]['id']);
//
//    try
//    {
//        $imagesRes = $pdo->prepare($imagesQuery);
//        $imagesRes->execute($imagesParams);
//    }
//    catch (PDOException $e)
//    {
//        echo $e;
//        die();
//    }
//
//    while (is_array($imagesRow = $imagesRes->fetch(PDO::FETCH_ASSOC)))
//    {
//        /* Add each url to the "images" array. */
//        $data[$i]['images'][]['url'] = $imagesRow['url'];
//    }
//    $i = $i+1;
//}




/* Create the JSON string. */
$json = "";
//    json_encode($data, JSON_PRETTY_PRINT);

/* Set the JSON content-type. */
header('Content-Type: application/json');

/* Return the JSON string. */
echo $json;
