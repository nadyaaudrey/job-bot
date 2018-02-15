$(document).ready(function() {
	initializePage();
	console.log("Page initialized!");
})

function initializePage() {
	$("#bookmarkToggle").click(toggleBookmark);
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
