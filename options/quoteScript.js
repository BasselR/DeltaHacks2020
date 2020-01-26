$.getJSON( "quotes.json", function( json ) {
    console.log(json);
});
function newQuote() {
    document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
}