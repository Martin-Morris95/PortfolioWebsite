

<?php

/*
if($_POST) {
    require 'PHPMailer-master/PHPMailerAutoload.php';
     
    $email='martin.morris@outlook.com';//change email to receipents email

$visitor_name = "";
$visitor_email = "";
$visitor_message = "";

if(isset($_POST['visitor_name'])) {
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

$mail->Body    = $visitor_message;
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
*/


<?php
if(isset($_POST['email'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "martin.morris95@outlook.com";
    $email_subject = "Your email subject line";
 
    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
 
 
    // validation expected data exists
    if(!isset($_POST['name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['text'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
    }
 
     
 
    $first_name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
    $comments = $_POST['text']; // required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
  }
 

 
  if(strlen($comments) < 2) {
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
  }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "Form details below.\n\n";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
 
    $email_message .= "First Name: ".clean_string($first_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Comments: ".clean_string($comments)."\n";
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->
 
Thank you for contacting us. We will be in touch with you very soon.
 
<?php
 
}
?>
?>
