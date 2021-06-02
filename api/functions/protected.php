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

require "../libs/jwt/vendor/autoload.php";
use \Firebase\JWT\JWT;

// get database connection
$database = new Database();
$db = $database->getConnection();

$secret_key = "YOUR_SECRET_KEY";
$jwt = null;

$data = json_decode(file_get_contents("php://input"));

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];

$arr = explode(" ", $authHeader);
$jwt = $arr[1];

if($jwt){
    try {
        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));

        // Access is granted. Add code of the operation here
        echo json_encode(array(
            "message" => "Access granted:",
            "error" => ''
        ));
    }
    catch (Exception $e){
        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
}
?>