$.getJSON("../quotes.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});
function newQuote() {
    document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
}