exports.logout = function(req, res) {
	res.clearCookie("user");
	res.send({'success': true});
}
