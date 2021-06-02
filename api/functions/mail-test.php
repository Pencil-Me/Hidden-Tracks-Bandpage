<?php
include_once '../config/mailconfig.php';

$mail = new Mail();

$mail->sendmail = 'doitbaby';
$mail->name = 'test name';
$mail->email = 'test_email@test.domain';
$mail->message = 'test message';

$mail->sendEmail();
