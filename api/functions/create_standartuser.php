<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// database connection will be here
// files needed to connect to database
include_once '../objects/database.php';
include_once '../objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate product object
$user = new User($db);

// submitted data will be here
// get posted data

// set product property values
$user->firstname    = "Johannes";
$user->lastname     = "Kromer";
$user->username     = "Joschi";
$user->email        = "jkromer@web.de";
$user->password     = "123Hacker123";

echo 'test '.$user->usernameExists();
// use the create() method here
// create the user
//if(
//    !empty($user->username) &&
//    !empty($user->email) &&
//    !empty($user->password) &&
//    $user->create()
//){
//
//    // set response code
//    http_response_code(200);
//
//    // display message: user was created
//    echo json_encode(array("message" => "User was created."));
//}
//
//// message if unable to create user
//else{
//
//    // set response code
//    http_response_code(400);
//
//    // display message: unable to create user
//    echo json_encode(array("message" => "Unable to create user."));
//}
?>