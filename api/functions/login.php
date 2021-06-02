<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// database connection will be here
// files needed to connect to database
include_once '../config/database.php';
include_once '../objects/user.php';

require "../libs/jwt/vendor/autoload.php";
use \Firebase\JWT\JWT;

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$user = new User($db);

// check email existence here
// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$user->username = $data->username;
$username_exists = $user->usernameExists();

// files for jwt will be here
// generate json web token
include_once '../config/core.php';

// generate jwt will be here
// check if username exists and if password is correct
if($username_exists && password_verify($data->password, $user->password)){
    $secret_key = "YOUR_SECRET_KEY";
    $issuer_claim = "THE_ISSUER"; // this can be the servername
    $audience_claim = "THE_AUDIENCE";
    $issuedat_claim = time(); // issued at
    $notbefore_claim = $issuedat_claim + 10; //not before in seconds
    $expire_claim = $issuedat_claim + 60; // expire time in seconds
    $token = array(
        "iss" => $issuer_claim,
        "aud" => $audience_claim,
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "exp" => $expire_claim,
        "data" => array(
            "id" => $user->id,
            "username" => $user->username,
            "firstname" => $user->firstname,
            "lastname" => $user->lastname,
            "email" => $user->email
        ));

    // set response code
    http_response_code(200);

    // generate jwt
    $jwt = JWT::encode($token, $secret_key);
    echo json_encode(
        array(
            "message" => "Successful login.",
            "jwt" => $jwt,
            "username" => $user->username,
            "expireAt" => $expire_claim
        ));
}

// login failed will be here
// login failed
else{

    // set response code
    http_response_code(401);

    // tell the user login failed
    echo json_encode(array("message" => "Login failed."));
}
?>