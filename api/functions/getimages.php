<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/images.php';

$database = new Database();
//$db = $database->getConnection();

$request_body = json_decode(file_get_contents('php://input'), true);
$item = new Images();
$item->type = $request_body?->type;

// create array
$emp_arr = array(
    "type" => $item->type,
    "images" => $item->getImagesFromFolder()
);

http_response_code(200);
echo json_encode($emp_arr);
?>