<?php

require_once('recaptchalib.php');

// Get a key from https://www.google.com/recaptcha/admin/create
$publickey = "6LdQLugSAAAAACYnYFfmvj41sHNIj5xXvld8Q_tb";
$privatekey = "6LdQLugSAAAAAIeHBiBANVwi-f12uQ1FG0HQ8Sa0";

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