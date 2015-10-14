// app/routes.js
var Upload = require('../config/multer');
var Listings = require('./models/listings');
var Buildings = require('./models/buildings');
var Users = require('./models/users');


module.exports = function(app) {

    // =====================================
    // Login & Register ========
    // =====================================

    //Register
    app.post('/register', function(req, res){
        var newUser = new Users(req.body);

        newUser.save(function(err, doc){
            res.send(doc);
        });
    });
    //Login
    app.post('/login', function(req, res){
        var email = req.body.email;
        var password = req.body.password;

        Users.findOne({"email": email}, function(err, doc){
            if(password == doc.password){
                res.send(doc)
            }else{
                res.send("Wrong password!");
            }
        });
    });

    // =====================================
    // Post Listing ========
    // =====================================
    app.post('/post-listing/:buildingID?/:available?', function(req, res){

        var buildingID = req.params.buildingID;
        var available = req.params.available;

        if(available == 'yes'){
            // Add to 'vacancies' Array
            Buildings.findByIdAndUpdate(buildingID,
                {$addToSet: {vacancies: req.body}},
                    function(err, doc){
                        if(err) console.log(err);
                        
                });  
        }


        // Add to 'units' Array
        Buildings.findByIdAndUpdate(buildingID,
                {$addToSet: {units: req.body}},
                    function(err, doc){
                        if(err) console.log(err);
                        res.send(doc);
        });

        // res.redirect('/#/admin');

    });
    
    // =====================================
    // Delete Listing  =======
    // =====================================
    app.get('/delete-listing/:buildID?/:aptID?/:aptIdx?/:available?', function(req, res){
        var aptIdx = req.params.aptIdx;
        var buildID = req.params.buildID;
        var aptID = req.params.aptID;
        var available = req.params.available;
        

        Buildings.findById(buildID, function(err, doc){
            doc.units.splice(aptIdx, 1);

            if(available == 'yes'){
                Buildings.update({'_id': buildID}, {$pull: {
                    'vacancies': {aptNum : aptID}
                }}, function(err){
                    if(err) console.log(err);
                });
            };

            doc.save(function(err){
                if(err){
                    console.log(err);
                }else {
                    res.send(doc);
                }
            });
        });

    });


    // =====================================
    // Building ========
    // =====================================

    //Get buildings
    app.get('/buildings', function(req, res){
        Buildings.find(function(err, docs){
            res.send(docs);
        });
    });

    //Get Building
    app.get('/building/:buildID?', function(req, res){
        var buildID = req.params.buildID;
        Buildings.findById(buildID, function(err, doc){
            res.send(doc);
        });
    });
    //Post Building
    app.post('/post-building', function(req, res){
        var newBuilding = new Buildings(req.body);


        newBuilding.save(function(err, doc){
            res.send(doc);
        });


    });
    //Delete Building
    app.get('/delete-building/:buildID?', function(req, res){
        var buildID = req.params.buildID;

        Buildings.remove({ _id: buildID }, function(err){
            if(err) console.log(err);
            res.send(200);
        });
    });
    // =====================================
    // Edit Building ========
    // =====================================
    app.post('/edit-building/:buildID?', function(req, res){
        var buildID = req.params.buildID;

        Buildings.update({_id: buildID}, req.body, function(err, doc){
            res.send(doc);
        });

    });

    // =====================================
    // Upload Image
    // =====================================
    app.post('/upload', Upload.array('imgFiles', 12), function(req, res){
        
        var buildID = req.body.buildID;
        var aptID = req.body.aptID;
        var aptIDX = req.body.aptIDX;

        var images = [];

        req.files.forEach(function(file, idx, arr){
            images.push(file);
            
        });

        //if listingID is true 
        //do something...

        if(aptID){

            Buildings.findById(buildID, function(err, doc){
               if(doc.units[aptIDX].available == 'yes'){
                    Buildings.update({'vacancies.aptNum': aptID}, {'$set': {
                        'vacancies.$.imgFiles': images
                    }}, function(err) {
                        if(err) console.log(err);

                        // res.redirect('/#/preview/' + buildID);
                    });
               };
               Buildings.update({'units.aptNum': aptID}, {'$set': {
                    'units.$.imgFiles': images
                }}, function(err) {
                    if(err) console.log(err);

                    res.redirect('/#/preview/' + buildID);
                });
            });

                      
        } else {
            Buildings.findByIdAndUpdate(buildID, 
                {$addToSet: {imgFiles: {$each: images}}}, 
                function(err, doc){
                    console.log('Upload Successful...');
                    res.redirect('/#/preview/' + buildID);
            });
        }

    });

    // =====================================
    // Make Available  =======
    // =====================================
    
    app.get('/available/:buildID?/:aptID?/:idx?/:available?', function(req, res){
        var buildID = req.params.buildID;
        var aptID = req.params.aptID;
        var idx = req.params.idx;
        var available = req.params.available;

        if(available == 'yes'){
            Buildings.update({'_id': buildID}, {$pull: {
                'vacancies' : { aptNum : aptID }
            }}, function(err){
                if(err) console.log(err);

                Buildings.findById(buildID, function(err, doc){
                    doc.units[idx].available = 'no';
                    

                    doc.save(function(err){
                        if(err) console.log(err);
                    });
                    res.send(doc);

                });
               
            });

            

        } else {
            Buildings.findById(buildID, function(err, doc){
                doc.units[idx].available = 'yes';

                var listing =  doc.units[idx];
                doc.vacancies.push(listing);

                doc.save(function(err){
                    if(err) console.log(err);
                });
                res.send(doc);

            });
        }

    });















};