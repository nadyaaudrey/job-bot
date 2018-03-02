$(document).ready(function() {
	initializePage();
	console.log("Page initialized!");
})

function initializePage() {
	$("#bookmarkToggle").click(toggleBookmark);
	$("#applyButton").click(applyReq);
	$("#backButton").click(goBack);
}

function toggleBookmark(e) {
	e.preventDefault();
	$.post('/addBookmark', {'jobid': $("#job_id").text()}, function(data) {
	    if(data.success) {
                if($("#bookmarkToggle").text() === "Bookmark") {
		    $("#bookmarkToggle").text("Unbookmark");
	            alert("Bookmark successfully added!");
	        }
	        else {
		    console.log($("#bookmarkToggle").text());
		    $("#bookmarkToggle").text("Bookmark");
		    alert("Bookmark successfully removed!");
	        }
	    }
	    else {
		    alert("User must be logged in to bookmark jobs.");
	    }
	});
	
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
