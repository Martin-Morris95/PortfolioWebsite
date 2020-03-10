


<?php
if($_POST) {
    require 'PHPMailer-master/PHPMailerAutoload.php';
    $email='martin.morris@outlook.com';//change email to receipents email

$visitor_name = "";
$visitor_email = "";
$visitor_message = "";

if(isset($_POST['name'])) {
    $visitor_name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
}
 
if(isset($_POST['email'])) {
    $visitor_email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
    $visitor_email = filter_var($visitor_email, FILTER_VALIDATE_EMAIL);
}
 
 
if(isset($_POST['text'])) {
    $visitor_message = htmlspecialchars($_POST['text']);
}
 

$mail = new PHPMailer();
$mail->SMTPDebug = 0; 
$mail->SMTPAuth = false;//SMTP authentication should be false
$mail->SMTPSecure = 'none';// Security type should be none 

$mail->Host = 'localhost';// SMTP host name should be localhost
$mail->Port = 25;  

$mail->setFrom($visitor_email, 'test email');     //Set who the message is to be sent from

//$mail->addReplyTo('test@yourdomain.com', 'test email');  //Set an alternative reply-to address
$mail->addAddress($email);  // Add a recipient
$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
$mail->isHTML(true);                                  // Set email format to HTML
$mail->Subject = $visitor_email;

$mail->Body = $visitor_message;
if(!$mail->send()) {
   echo 'Mailer Error: ' . $mail->ErrorInfo;
   echo 'Email Has not Sent';
   exit;
}
else{
  echo "email sent";
}

} else {
    echo '<p>Something went wrong</p>';
}
?>

