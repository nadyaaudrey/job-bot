function fb_login() {
	FB.login(statusChangeCallback, {scope: 'email'});
}
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

function statusChangeCallback(response) {
	if(response.status ===  'connected') {
		FB.api('/me', { fields: 'email' },
			function(response) {
				document.cookie = "user=" + response.email;
				window.location.replace('/index');
				console.log(sessionStorage.getItem('user'));
			});
	}
}
