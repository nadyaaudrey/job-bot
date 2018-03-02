$(document).ready(function() {
	initializePage();
	console.log("Page initialized!");
})

function initializePage() {
	//$("#bookmarkToggle").click(toggleBookmark);
	$("#applyButton").click(applyReq);
	$("#backButton").click(goBack);
}

function toggleBookmark(e) {
	e.preventDefault();
	if($(this).text() === "Bookmark") {
		$(this).text("Unbookmark");
	}
	else {
		$(this).text("Bookmark");
	}
}

function applyReq(e) {
	e.preventDefault();
	var jobid = $("#job_id").text();
	var joburl = $("#job_url").text();
	$.post('/apply/', {'jobid': jobid, 'joburl': joburl});
	window.location.replace(joburl);
}

function goBack(e) {
	e.preventDefault();
	window.history.back();
}
