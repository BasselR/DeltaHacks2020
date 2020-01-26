var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/deltahacks");

var personSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        entry: {}
    })
    newperson.save(function(err,human){
        if(err){
            console.log("there is an error");
        }
    });
    currentperson = newperson;
    res.redirect("/homepage.ejs");
});

app.post("/login",function(req,res){
    var useremail = req.body.email;
    var userpassword = req.body.password;
    Person.find({}, function(err,people){
        if(err){
            console.log(err);
        }else{
            for (person in people){
                if (person.email == useremail){
                    currentperson = person;
                    res.redirect("/homepage.ejs");
                }
            }
            res.alert("You must sign up first");
            res.redirect("/signup.ejs");
        }
    }));

app.get("/homepage",function(req,res){
    res.render("homepage.ejs",firstname:currentperson.firstname);
    //so the firstname thing above is basically a variable inputted into that HTML file which ill turn to a ejs file
});

app.get("/howfeeling",function(req,res){
    res.render("feeling.ejs");
})

app.post("/howfeelingsubmitted",function(req,res{
    currentperson.
}))

app.get("/motivquote",function(req,res){
    var motivequote = random of quotes
    res.render("motivationalquote.ejs",{embeddedquote : motivequote});
})




app.listen(3000,function(){
    console.log("serving");
});