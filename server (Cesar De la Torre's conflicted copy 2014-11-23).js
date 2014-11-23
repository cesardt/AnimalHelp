var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('lodash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var formidable = require('formidable');
var fs   = require('fs-extra');
var qt   = require('quickthumb');
var util = require('util');
var nodemailer = require('nodemailer');

var app = express();

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  isFacebook: Boolean,
  name: String,
  residence: String,
});
var placeSchema = new mongoose.Schema({
  name: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  description: String,
  timeOpen: String,
  timeClose: String, 
  latitude: Number,
  longitude: Number
});
var petSchema = new mongoose.Schema({
  name: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  adopters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  adopter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  description: String,
  species: String,
  size: String,
  city: String,
  state: String
});

var citySchema = new mongoose.Schema({
  state: String,
  city: String
});

var reviewSchema = new mongoose.Schema({
  title: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
  stars: Number,
  content: String
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.send(401);
}


userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);
var Place = mongoose.model('Place', placeSchema);
var Pet = mongoose.model('Pet', petSchema);
var Review = mongoose.model('Review', reviewSchema);
var City = mongoose.model('City', citySchema);

mongoose.connect('localhost');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false);
    });
  });
}));
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(qt.static(__dirname + '/'));

app.post('/upload/:id', function (req, res){
  var id = req.params.id;
  uploadImage(req, res, "/public/images/pets",id);
});

uploadImage = function(req, res, dir, id){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    var new_location = __dirname+dir;

    fs.copy(temp_path, new_location +"/"+ id +"/"+ file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
}

app.get('/api/map', function(req, res, next) {
  var query = Place.find();
  query.exec(function(err, places) {
    if (err) return next(err);
    res.send(places);
  });
});

app.get('/api/city', function(req, res, next) {
  var query = City.find();

  if(req.query.state){
    query.where({state: req.query.state});
  }

  query.exec(function(err, cities) {
    if (err) return next(err);
    res.send(cities);
  });
});

app.get('/api/review', function(req, res, next) {
  var query = Review.find();
  if(req.query.user){
    query.where({user: req.query.user});
  }
  query.exec(function(err, reviews) {
    if (err) return next(err);
    res.send(reviews);
  });
});

app.get('/api/lista', function(req, res, next) {
  var query = Pet.find();

  /*if(req.query.species && req.query.size){
    query.where({species: req.query.species, size: req.query.size });
  }
  else if (req.query.species) {
    query.where({ species: req.query.species });
  }
  else if(req.query.size) {
    query.where({size: req.query.size});
  }*/

  var queryStr = "";

  if(req.query.species){
    console.log()
  }
  if(req.query.size){
    query += 'size: '+req.query.size+',';
  }
  if(req.query.city){
    query += 'city: '+req.query.city+',';
  }
  if(req.query.state){
    query += 'state: '+req.query.state+',';
  }


  if(req.query._id){
    query.where({_id: req.query._id});
  }

  if(req.query.user){
    query.where({user: req.query.user});
  }
  //query.where({species: , size: , city: , state: });
  
  query.exec(function(err, pets) {
    if (err) return next(err);
    res.send(pets);
  });
});
app.get('/api/shows/:id', function(req, res, next) {
  Show.findById(req.params.id, function(err, show) {
    if (err) return next(err);
    console.log(show);
    res.send(show);
  });
});
app.get('/api/map/:id', function(req, res, next) {
  Place.findById(req.params.id, function(err, place) {
    if (err) return next(err);
    res.send(place);
  });
});
app.get('/api/lista/:id', function(req, res, next) {
  var id = req.params.id;
  Pet.findById(id, function(err, pet) {
    if (err) return next(err);
    var images;
    images = fs.readdirSync(__dirname+'/public/images/pets/'+id);
    res.send({pet: pet, pictures: images});
  });
});

app.get('/api/user/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);  
    res.send(user);
  
  });
});

  app.get('/api/modifyUser/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);  
    res.send(user);
  });

});
app.get('/api/addReview/:id', function(req, res, next){
  Place.findById(req.parasm.id, function(err, place) {
    if (err) return next(err);  
    res.send(place);
  });
});

app.post('/api/addReview', function(req, res, next){
  var user = new mongoose.Schema.ObjectId(req.body.user._id).path;
  var place = new mongoose.Schema.ObjectId(req.body.place._id).path;

  var review = new Review({

    title : req.body.title,
    content: req.body.content,
    user: user,
    place:place,
    stars: req.body.stars
    
    
    /* title: String,
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
      stars: Number,
      content: String*/
  });
  review.save(function(err){
    if(err) return next(err);
    res.send(200);
  });
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

app.post('/api/addPlace', function(req, res, next){
  var place = new Place({
    name: req.body.name,
    description: req.body.description,
    timeOpen: req.body.timeOpen,
    timeClose: req.body.timeClose, 
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  place.save(function(err){
    if(err) return next(err);
    res.send(200);
  });
});



app.post('/api/addPet', function(req, res, next){
  var user = new mongoose.Schema.ObjectId(req.body.user._id).path;
  var pet = new Pet({
    name: req.body.name,
    description: req.body.description,
    species: req.body.species,
    size: req.body.size, 
    location: req.body.location,
    user: user
  });
  pet.save(function(err){
    if(err) return next(err);
    res.send(pet);
  });

});
app.post('/api/login', passport.authenticate('local'), function(req, res) {
  res.cookie('user', JSON.stringify(req.user));
  res.send(req.user);
});

app.post('/api/signup', function(req, res, next) {
  var isFacebook = false;
  if(req.body.isFacebook){
    isFacebook = true;
  }
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    isFacebook: isFacebook
  });

  user.save(function(err) {
    if (err) return next(err);

  });
  res.send(user);

});

app.post('/api/mail', function(req, res, next){
  var petId = req.body.pet._id;
  Pet.findById(petId, function(err,pet){
    if (err) return next(err);
    pet.adopters.push(req.body.sender._id);
    pet.save(function(err) {
      if (err) return next(err);
        var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'animalhelpapp@gmail.com',
            pass: 'rodolfoelreno'
        }
      });
      text = 'You have received an adoption request from '+ req.body.sender.email +' to adopt '+ req.body.pet.name;
      transporter.sendMail({
        from: 'animalhelpapp@gmail.com',
        to: req.body.receiver.email,
        subject: 'Adoption request for '+req.body.pet.name,
        text: text
      }, function(error, response){  //callback
         if(error){
            console.log(error);
             return next(error);
         }else{
             res.send(pet.id);
         }
         transporter.close();
       });
    });
  })

  
});

app.use(function(req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
