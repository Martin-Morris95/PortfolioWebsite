<?php
 
if($_POST) {
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
     
   
    $recipient = "martin.morris@thomsonadsett.com";
    
   
     
    $headers  = 'MIME-Version: 1.0' . "\r\n"
    .'Content-type: text/html; charset=utf-8' . "\r\n"
    .'From: ' . '$visitor_email' . "\r\n";
     
    if(mail($recipient, "Website Query", $visitor_message, $headers)) {
        echo "<p>Thank you for contacting us, $visitor_name. We will be in touch soon.</p>";
    } else {
        echo '<p>We are sorry but the email did not go through.</p>';
    }
     
} else {
    echo '<p>Something went wrong</p>';
}
 
?>