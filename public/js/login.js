$(document).ready(function() {
	initializePage();
})

function initializePage() {
        $('#signin-button').click(checkCred);
}

function checkCred(e) {
        e.preventDefault();
        var email = $('#Form-email1').val();
        var pass = $('#Form-pass1').val();
        if(email.length == 0 || pass.length == 0) {
                return;
        }
        $.post("/login", {'email': email, 'pass': pass}, function(result) {
               if(result.login_status) {
                   sessionStorage.user = email;
                   window.location.replace("/index");
               }
        });
} 
