<?php
 
require_once('recaptchalib.php');
 
// Get keys from https://www.google.com/recaptcha/admin/create
$publickey = "6LdIgvsSAAAAAF8FrIu3yFH9axuEy9RhAXaYwMwx";
$privatekey = "6LdIgvsSAAAAANJ4PVBYpkwEUNM3CDcAy67evBbl";
 
# the response from reCAPTCHA
$resp = null;
 
# was there a reCAPTCHA response?
if ($_POST["recaptcha_response_field"]) {
    $resp = recaptcha_check_answer ($privatekey,
        $_SERVER["REMOTE_ADDR"],
        $_POST["recaptcha_challenge_field"],
        $_POST["recaptcha_response_field"]);
 
    if ($resp->is_valid) {
        echo "success";
    } else {
        echo "failure";
    }
}
?>