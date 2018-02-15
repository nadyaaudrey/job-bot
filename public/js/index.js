$(document).ready(function() {
	initializePage();
	console.log("Page initialized!");
})

function initializePage() {
	$("#bookmarked-only").click(hideNonBookmarked);
	$("#no-filter").click(showNonBookmarked);
}

function hideNonBookmarked(e) {
	e.preventDefault();
	$(".unbookmarked").hide();
}

function showNonBookmarked(e) {
	e.preventDefault();
	$(".unbookmarked").show();
}
