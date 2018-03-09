function fb_login() {
	FB.login(statusChangeCallback, {scope: 'public_profile'});
}
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

function statusChangeCallback(response) {
	if(response.status ===  'connected') {
		FB.api('/me?fields=name,picture.width(250),email',
			function(response) {
				document.cookie = "user=" + response.id;
				document.cookie = "name=" + response.name;  
				document.cookie = "profile_pic=" + response.picture.data.url;
				window.location.replace('/index');
			});
	}
}

