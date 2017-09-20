var express = require('express');
var router = express.Router();
const standupCtrl = require('../controllers/standup.server.controller.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  return standupCtrl.list(req,res);
});

router.post('/', function (req,res) {
  return standupCtrl.filterByMember(req,res);
})

/*GET New Note*/
router.get('/newnote', function(req,res){
  return standupCtrl.getNote(req,res);
})
/* POST New Note page*/
router.post('/newnote', (req,res) => {
  return standupCtrl.created(req,res);
})
module.exports = router;
