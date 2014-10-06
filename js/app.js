// app.js
$( document ).ready(function(){

       $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    
    function setupUI() {
	    json_id = $( "#result" );
	    if ( json_id.length ) {
	        json_id.hide();
	    };
	    email_id = $('#email');
	    if ( email_id.length ) {
	        email_id.hide();
	    };
	    captcha = $("#captchaDiv");
	    captcha.hide();
	};

    // $('form').submit(function() {
    function send_form() {
        var myObj = $('#form1').serializeObject();
        var postStr = JSON.stringify(myObj); // creates a json object out of a JS object
        // display the result         
        json_id.text(postStr); 
        json_id.slideDown();
        myObj.jstr = postStr; // this adds a new jstr field to the javascript object.       
        console.log(myObj);
        // ajax call to send_mail.php
        $.post("send_email.php", myObj, function(res){ 
            email_id.text(res); 
        });
        email_id.slideDown(); 
        return false;
    };

 
    // VALIDATE THE reCAPTCHA
    function recapVerify(){
        $.ajax({
        type:'post',
        url: 'captcha_proxy.php',
        data: {
            recaptcha_challenge_field:$('#recaptcha_challenge_field').val(),
            recaptcha_response_field:$('#recaptcha_response_field').val()
        }
    }).done(function(data, textStatus, jqXHR){
        if (data == 'success'){
            $('#err').addClass('hidden');
            captcha.slideUp(); 
            send_form(); 
            // document.forms[0].submit(); 
        } else {
            $('#err').removeClass('hidden');
        }
    }).fail(function(jqXHR,textStatus,errorThrown){
            console.log('proxy or service failure');
    });
    };
 
    // WHEN CALLED THIS INSETS THE reCAPTCHA INTO THE PAGE
    function reCapInsert(){
        Recaptcha.create('6LdIgvsSAAAAAF8FrIu3yFH9axuEy9RhAXaYwMwx',  // public key
        'recap',
            {
                theme: 'clean',
                callback: Recaptcha.focus_response_field
            }
        );
    };

    // add listener
    $("#submit").on('click',function() {
        var isValid = $("input[name='email']").val().length != 0 ? true : false;
        if (!isValid){ // FORM VALIDATION FAILED
            alert('Email is required');
     
        } else { //FORM VALIDATION SUCCEEDED, validate the reCAPTCHA
            captcha.show();
        }
        return false;
    });


    $("#validate").on('click',function() {
    	// alert("hello world");
    	recapVerify();
		return false;
    });

	(function(){
		// WHEN THE DOM HAS LOADED FIRE THE reCapInsert FUNCTION TO INSERT THE reCAPTCHA    
		reCapInsert();
		setupUI();
	}).call(this);

});
