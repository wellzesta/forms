<?php
if(strlen($_POST['email'])) {
// no error checking. Dangerous. 
// set this 
$email_to = "john.robinson@wellzesta.com";     
$email_subject = "New Paleo Recipe";

// extract data
$first_name = $_POST['first_name']; // required
$last_name = $_POST['last_name']; // required
$email_from = $_POST['email']; // required
$validation = $_POST['validation']; // required
$comments = $_POST['comments']; // not required
$json = $_POST['jstr'];
$email_message = "Contents:\n\n\n";
$email_message .= "First Name: ".$first_name."\n";
$email_message .= "Last Name: ".$last_name."\n";
$email_message .= "Email: ".$email_from."\n";
$email_message .= $json."\n";   
// create email headers
$headers = 'From: '.$email_from."\n".
'Reply-To: '.$email_from."\n" .
'X-Mailer: PHP/' . phpversion();
echo "$email_message";
@mail($email_to, $email_subject, $email_message, $headers);  
}
else {
echo "Message not sent: message did not incluce an email address";
}
?>