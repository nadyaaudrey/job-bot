function logout(e) {
	e.preventDefault();
        $.post("/logout");
	window.location.replace("/");
}	
	
