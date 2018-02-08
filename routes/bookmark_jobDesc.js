exports.view = function(req, res) {
    var bookmark_jobDesc = require("../job_desc.json");
    res.render('bookmark_jobDesc', {bookmark_jobDesc});
}

