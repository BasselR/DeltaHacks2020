var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/deltahacks");
var request = require('request');
request('http://worldtimeapi.org/api/timezone/Europe/London',function(error,response,body){
    if(!error && response.statusCode==200){
        console.log(typeof(body));
        console.log((body));
        var Data = JSON.parse((body));
        console.log((body));
        date = (Data.utc_datetime);
        var x = 0;
        datte = ""
        while(date[x]!="T"){
            datte+= date[x];
            x++;
        }
        console.log(datte);
    }});

app.use(express.static("public"));


var personSchema = new mongoose.Schema({
    email: String,
    password: String,
    entry: Object
});


var Person = mongoose.model("Person",personSchema);

app.get("/",function(req,res){
    res.render("index.ejs");
});

var currentperson;

app.post("/signup",function(req,res){
    var newperson = new Person({
        email:req.body.email,
        password:req.body.password,
        entry: {Null:Null}
    });
    newperson.save(function(err,human){
        if(err){
            console.log("there is an error");
            return;
        }else{
            console.log(human);
        }
    });
    currentperson = newperson;
    res.redirect("/home");
});


app.post("/login",function(req,res){
    var useremail = req.body.email;
    Person.find({}, function(err,people){
        if(err){
            console.log("there is an error");
            console.log(err);
        }else{
            for (x in people){
                if (people[x].email == useremail){
                    currentperson = people[x];
                    res.redirect("/home");
                    return;
                }
            }
            res.redirect("/regpage");
        }
    })});


app.get("/regpage",function(req,res){
    res.render("register.ejs");
});

app.get("/logpage",function(req,res){
    res.render("login.ejs");
});

app.get("/home",function(req,res){
    res.render("home.ejs");
});

app.get("/journal",function(req,res){
    res.render("option1.ejs");
});

app.get("/quoter",function(req,res){
    res.render("option2.ejs");
});

app.get("/locater",function(req,res){
    res.render("option3.ejs");
});

/*app.post("/whatgratefulfor",function(req,res){
    var feeling = req.body.feeling;
    currentperson.entry.datte = feeling;
    Person.findOneAndUpdate({email:currentperson.email},{entry:currentperson.entry});
    res.redirect("/whatgratefulforsubmitted");
});

app.get("/whatgratefulforsubmitted",function(req,res){
    Person.find({}, function(err,people){
        if(err){
            console.log("there is an error");
            console.log(err);
        }else{
            for (x in people){
                if (people[x].email == currentperson.email){
                    res.render("table.ejs",{table: people[x].entry});
                    return;
                }
            }
        }
    })});

app.get("/pastgratefuls",function(req,res){
    res.render("pastgratefuls.ejs",{objectfortable: currentperson.entry});
});*/




app.listen(3000,function(){
    console.log("serving");
});