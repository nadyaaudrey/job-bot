exports.view = function(req, res) {
    var appHistory_jobDesc = require("../job_desc.json");
    res.render('appHistory_jobDesc', {appHistory_jobDesc});
}

