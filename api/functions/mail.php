<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/mailconfig.php';

$request_body = json_decode(file_get_contents('php://input'), true);

$mail = new Mail();
$mail->sendmail = $request_body?->sendmail;
$mail->name = $request_body?->name;
$mail->email = $request_body?->email;
$mail->message = $request_body?->message;

$mail->sendEmail();
