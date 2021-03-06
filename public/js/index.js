$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$("#bookmarked-only").click(hideNonBookmarked);
	$("#no-filter").click(showNonBookmarked);
	$("#basic-addon1").click(search);
	$(".bookmarkIcon").click(bookmark);
	$(".job_posting").click(recordJobClick);
	$("#filter-button").click(recordFilterClick);
	$(".unclickableBookmarkIcon").click(bookmarkClick);
        $("#logoutButton").click(logout);
}

function hideNonBookmarked(e) {
	e.preventDefault();
	gtag('event', 'click', {'event_category': 'filterOption'});
	$(".unbookmarked").hide();
}

function showNonBookmarked(e) {
	e.preventDefault();
	gtag('event', 'click', {'event_category': 'filterOption'});
	$(".unbookmarked").show();
}

function search(e) {
	e.preventDefault();
	var search_param = document.getElementById('searchBox').value;
	console.log(search_param);
	if(search_param.length > 0) {
		/*
		$(".job_posting").remove();
		$.get("https://jobs.github.com/positions.json?description=" + search_param + "&page=0", function(data) {
			console.log(data);
			console.log("test");
			for(job in data) {
			console.log(job);
                        var jobHTML = '<div class="job_posting">' + 
				      '<a href="/job_desc/' + job.id + '">' + 
                                      '<div class="media border">' + 
	                              '<div class="media-left">' + 
		                      '<img src="' + job.company_logo + '" width="100" height="100">' +
	                              '</div><div class="media-body">' + 
		                      '<p class="media-heading">' + job.title + '</p>' + 
		                      '<p>' + job.company + '</p>' +
		                      '<p>' + job.location + '</p>' +
	                              '</div>' +
	                              '<span class="media-right fa fa-bookmark-o fa-2x" style="margin-right: 50px; margin-top: 50px"></span>' +
                                      '</div>' +
                                      '</a>' +
                                      '</div>';
			$("#job_list").append(jobHTML);
			}

		});
		*/
		window.location.replace('/index/' + search_param);
	}
}

function bookmark(e) {
    e.preventDefault();
    gtag('event', 'click', {'event_category': 'Bookmark'});
    var jobid = $(this).attr('id');
    $.post('/addBookmark', {'jobid': $(this).attr('id')}, function(data) {
	    if(data.success) {
		    var icon = $('#' + jobid);
		    var card = $('#card-' + jobid);
		    if(icon.hasClass('fa-bookmark-o')) {
		        icon.addClass('fa-bookmark').removeClass('fa-bookmark-o');
			card.removeClass('unbookmarked');
			alert("Bookmark successfully added!");
		    }
	            else {
			card.addClass('unbookmarked');
			icon.addClass('fa-bookmark-o').removeClass('fa-bookmark');
			alert("Bookmark successfully removed!");
		    }
	    }
            else {
		    alert("User must be logged in to add bookmarks. Please use the Facebook login!");
	    }
	});
}

function recordJobClick(e) {
    gtag('event', 'click', {'event_category': 'Job Posting'});
}

function recordFilterClick(e) {
    gtag('event', 'click', {'event_category': 'Filter Button'});
}

function bookmarkClick(e) {
    gtag('event', 'click', {'event_category': 'Bookmark'});
}
