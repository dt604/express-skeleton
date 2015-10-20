// app/routes.js
var Upload = require('../config/multer');
var Listings = require('./models/listings');
var Buildings = require('./models/buildings');
var Users = require('./models/users');
var nodemailer = require('nodemailer');
//transporter
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'dantran604@gmail.com', // Your email id
        pass: 'ilovegolf88' // Your password
    }
});


module.exports = function(app) {
    // =====================================
    // Post Applicationo Form w/Nodemailer =
    // =====================================
    app.post('/application', function(req, res){
        //Set Mail Options
        var user = req.body;

        var mailOptions = {
            from: req.body.email,
            to: 'dantran604@gmail.com',
            subject: 'Application Form Submitted',

            html:
                '<h2>1. Preferences</h2>' + 
                '<b>Building: </b>' + user.building + '<br />' +
                '<b>Unit: </b>#' + user.aptNum + '<br />' +
                '<b>Move In Day: </b>' + user.moveInDay + '<br />' +

                '<h2>2. Applicant Information</h2>' +
                '<b>First Name: </b>' + user.fName + '<br />' +
                '<b>Middle Name: </b>' + user.mName + '<br />' +
                '<b>Last Name: </b>' + user.lName + '<br />' +
                '<b>Email: </b>' + user.email + '<br />' + 
                '<b>Phone: </b>' + user.phone + '<br />' + 
                '<b>Alternate Phone: </b>' + user.altPhone + '<br />' +
                '<b>Date of Birth: </b>' + user.dob.day + '/'
                    + user.dob.month + '/' + user.dob.year + '<br />' +

                '<h2>3. Current Address</h2>' + 
                '<b>Street Address: </b>' + user.currAdr + '<br />' + 
                '<b>Suite #: </b>' + user.currAptNum + '<br />' +
                '<b>City: </b>' + user.currCity + '<br />' +
                '<b>Province: </b>' + user.currProvince + '<br />' +
                '<b>Postal Code: </b>' + user.currPostal + '<br />' +
                '<b>Lived at for: </b>' + user.currAdrLen + '<br />' +

                '<h2>4. Previous Address</h2>' +
                '<b>Street Address: </b>' + user.prevAdr + '<br />' + 
                '<b>Suite #: </b>' + user.prevAptNum + '<br />' +
                '<b>City: </b>' + user.prevCity + '<br />' +
                '<b>Province: </b>' + user.prevProvince + '<br />' +
                '<b>Postal Code: </b>' + user.prevPostal + '<br />' +
                '<b>Lived at for: </b>' + user.prevAdrLen + '<br />' +

                '<h2>5. Financial And References</h2>' +
                '<b>Employment Status: </b>' + user.employment + '<br />' +

                '<h2>6. Occupants</h2>' +
                '<b>Other Occupants: </b>' + user.occupants + '<br />' +

                '<h2>7. Applicant Statements And Consent</h2>' +
                '<b>Pets: </b>' + user.pets + '<br />' +
                '<b>Smoker: </b>' + user.smoker + '<br />' +
                '<b>Insured: </b>' + user.insured + '<br />' +
                '<b>Referral: </b>' + user.referral + '<br />' +
                '<b>Agree: </b>' + user.agree + '<br />' +
                '<p><b>Comment: </b>' + user.comment + '</p>'

 

        }

        //Send Email
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });
    })

    // =====================================
    // Post Viewing Form w/Nodemailer ======
    // =====================================
    app.post('/viewing/:buildName?', function(req, res){
        var buildName = req.params.buildName;

        var mailOptions = {
            from: req.body.email, // sender address
            to: 'dantran604@gmail.com', // list of receivers
            subject: 'Somebody wants a viewing' , // Subject line
            // text: 'Name: ' + req.body.name + ' Email: ' + req.body.email + ' Message: ' +
            //     message //, // plaintext body
            html: '<b>Name: </b>' + req.body.name + 
                  '<br /> <b>Email: </b>' + req.body.email +
                  '<br /> <b>Phone: </b>' + req.body.phone +
                  '<br /><b>Building: </b>' + buildName +
                  '<br /><b>Apartment #: </b>' + req.body.aptNum + 
                  '<br /><b>Date: </b>' + req.body.date + 
                  '<br /><b>Time: </b>' + req.body.timeOfDay
                   // You can choose to send an HTML body instead
        };

        //Send Email
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });
    });
    
    // =====================================
    // Post Contact Form w/Nodemailer ======
    // =====================================
    app.post('/contact', function(req, res){
        
        var message = req.body.message;
        var mailOptions = {
            from: req.body.email, // sender address
            to: 'dantran604@gmail.com', // list of receivers
            subject: 'Request For Rental Information', // Subject line
            // text: 'Name: ' + req.body.name + ' Email: ' + req.body.email + ' Message: ' +
            //     message //, // plaintext body
            html: '<b>Name: </b>' + req.body.name + 
                  '<br> <b>Email: </b>' + req.body.email +
                  '<p><b>Message:</b> <br>' + req.body.message + '</p>'
                   // You can choose to send an HTML body instead
        };

        //Send Email
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });
    });


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
            if(!doc){
                return res.send('wrong email');
            }
            if(password == doc.password){
                res.send(doc);
            } else {
                return res.send('wrong password');
            }
            


            // if(password == doc.password){
            //     res.send(doc)
            // }else{
            //     res.send("Wrong password!");
            // }
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
    // Update Listing ======================
    // =====================================
    app.get('/updateUnit/:buildID?/:aptID?/:idx?/:rent?/', function(req, res){
        var buildID = req.params.buildID;
        var aptID = req.params.aptID;
        var idx = req.params.idx;
        var rent = req.params.rent;

        Buildings.findById(buildID, function(err, doc){
            doc.units[idx].rentAmt = rent;
            doc.save(function(err, doc){
                if(err) res.send(err);

                res.send(doc);
            });
        });
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
    //Get Building by Name
    app.get('/buildByName/:buildID?', function(req, res){
        var buildID = req.params.buildID;
        Buildings.findOne({'name': buildID}, function(err, doc){
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


            Buildings.update({'units._id': aptID}, {'$set': {
                'units.$.imgFiles': images
            }}, function(err) {
                if(err) console.log(err);

                res.redirect('/#/preview/' + buildID);
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