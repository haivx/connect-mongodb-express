const Standup = require('../models/standup.server.model.js');

exports.list = function(req, res) {
  let query = Standup.find();

  query.sort({createdOn: 'desc'}).limit(12).exec(function(err, results) {
    // console.log(results);
    res.render('index', {
      title: 'Standup-list',
      notes: results
    });
  })
}

exports.filterByMember = function(req, res) {
  let query = Standup.find();
  let filter = req.body.memberName;

  query.sort({createdOn: 'desc'});

  if (filter.length > 0) {
    query.where({memberName: filter})
  }
  query.exec(function(error, results) {
    if (error) {
      console.log(error)
    }
    res.render('index', {
      title: 'Standup-list',
      notes: results
    })
  })
}

exports.created = function(req, res) {
  let entry = new Standup({
    memberName: req.body.memberName,
     project: req.body.project,
     workYesterday: req.body.workYesterday,
     workToday: req.body.workToday,
     impediment: req.body.impediment
});



  entry.save(function (err) {
 if(err){
      let errMsg =  'Oop! There was an error when saving data';
      res.render('newnote',{title: 'Standup- newnote -error', message: errMsg})} else {
        console.log('The data was save on database');
          //Redirect to homepage
          res.redirect(301, '/');
      }
});
};

exports.getNote = function(req, res) {
  console.log('Oat the pig');
  res.render('newnote', {title: 'Standup - New Note'});
}
