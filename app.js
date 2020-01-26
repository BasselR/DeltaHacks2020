var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/deltahacks");
var request = require('request');
request('http://worldtimeapi.org/api/timezone/Europe/London.txt',function(error,response,body){
    if(!error && response.statusCode==200){
        var Data = JSON.parse(body);
    }});




var personSchema = new mongoose.Schema({
    email: String,
    password: String,
    entry: Object
});



var Person = mongoose.model("Person",personSchema);

app.get("/",function(req,res){
    res.render("webpage.ejs");
});

var currentperson;

app.post("/signup",function(req,res){
    var newperson = new Person({
        email:req.body.email,
        password:req.body.password,
        entry: {}
    });
    newperson.save(function(err,human){
        if(err){
            console.log("there is an error");
        }else{
            console.log(human);
        }
    });
    currentperson = newperson;
    res.redirect("/homepage.ejs");
});


app.post("/login",function(req,res){
    var useremail = req.body.email;
    Person.find({}, function(err,people){
        if(err){
            console.log(err);
        }else{
            for (person in people){
                if (person.email === useremail){
                    currentperson = person;
                    res.redirect("/homepage.ejs");
                }
            }
            res.redirect("/signup.ejs");
        }
    })});


app.get("/homepage",function(req,res){
    res.render("homepage.ejs",{firstname:currentperson.email});
    //so the firstname thing above is basically a variable inputted into that HTML file which ill turn to a ejs file
});


app.get("/howfeeling",function(req,res){
    res.render("feeling.ejs");
});


app.get("/whatgratefulfor",function(req,res){
    res.render("grateful.ejs");
});


app.post("/whatgratefulforsubmitted",function(req,res){
    var feeling = req.body.feeling;
    date = (Data.utc_datetime).slice(0,10);
    currentperson.entry.date = feeling;
    Person.findOneAndUpdate({email:currentperson.email},{entry:currentperson.entry});
});


app.get("/motivquote",function(req,res){
    var motivequote = random of quotes
    res.render("motivationalquote.ejs",{embeddedquote : motivequote});
});


app.get("/pastgratefuls",function(req,res){
    res.render("pastgratefuls.ejs",{objectfortable: currentperson.entry});
});




app.listen(3000,function(){
    console.log("serving");
});