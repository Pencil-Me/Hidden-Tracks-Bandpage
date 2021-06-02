<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../libs/PHPMailer/vendor/autoload.php';

// used to get mysql database connection
class Mail
{
    // smpt credentials for email
    private $host = MailConfig::host;
    private $username = MailConfig::username;
    private $password = MailConfig::password;
    private $port = MailConfig::port;

    private $PHPMailer;

    public $sendmail;
    public $name;
    public $email;
    public $message;

    // constructor
    public function __construct(){
        $this->PHPMailer = new PHPMailer(true);
    }

    function sendEmail() {
        $mail = $this->PHPMailer;
        if ($this->sendmail === "doitbaby") {
            try {
                //Server settings
                $mail->isSMTP();                                    //Send using SMTP
                $mail->CharSet = 'utf-8';
                $mail->Host = $this->host;                          //Set the SMTP server to send through
                $mail->SMTPAuth = true;                             //Enable SMTP authentication
                $mail->Username = $this->username;                  //SMTP username
                $mail->Password = $this->password;                  //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
                $mail->Port = $this->port;                          //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

                //Recipients
                $mail->setFrom($this->username, 'Kontaktformular HiddenTracks');
                $mail->addAddress($this->username, 'Kontaktformular HiddenTracks');     //Add a recipient
                $mail->addReplyTo($this->email, $this->name);
                //    $mail->addCC('cc@example.com');
                //    $mail->addBCC('bcc@example.com');

                //Attachments
                //    $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
                //    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

                //Content
                $mail->isHTML(true);                                    //Set email format to HTML
                $mail->Subject = 'Nachricht über Kontaktformular HiddenTracks';
                $mailContent = "<p>FROM: $this->name</p>";
                $mailContent .= "<p>EMAIL: $this->email</p>";
                $mailContent .= "<p>MESSAGE: $this->message</p>";
                $mail->Body = $mailContent;
                //    $mail->AltBody = $mailContent;

                $mail->send();
                echo 'Email send';
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        } else {
            echo 'Error';
        }
    }
}
