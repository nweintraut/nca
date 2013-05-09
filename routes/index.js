
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.mrpage = function(req, res) {
    res.send('Hello I am Mr. Page');
};
exports.anypage = function(req, res){
    var subpage = req.params[0];
    var parentPage = subpage ?  ' of the ' + req.params.page + ' page' : '';
    res.send('Welcome to the ' + (subpage || req.params.page) + ' page' + parentPage);
    
};
exports.anypageAdmin = function(req, res) {
  var admin = req.params.admin;
  if(admin) {
      if(['add', 'delete'].indexOf(admin)!== -1) {
          res.send('So you want to ' + req.params.admin + ' ' + req.params.page + "?");
          return;
      }
      res.send(404);
  }
};