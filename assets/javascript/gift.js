
//$(document.ready(function(){
    //console.log( "ready!" );
    
var countries = ["Dubai", "France", "Italy", "South Africa" , "Colombia"];
 

// Adding a click event listener to all elements with a class of "country-btn"
$(document).on("click", ".country-btn",function(){

// In this case, the "this" keyword refers to the button that was clicked
  var country = $(this).attr("data-country");

// Constructing a URL to search Giphy for the name of the country with a rating and only showing 10 pictures
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    country + "&api_key=3ZhRYHEhbIUJbH0OdoNLNuAZlIEwKRvw&limit=10";
     
// Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
      
// After the data comes back from the API
  .then(function(response) {
console.log(response);
        // Creating a div to hold the movie
    var countryDiv = $("<div class='country'>");

        // Putting the entire movie above the previous movies
    $("#country-view").prepend(countryDiv);
        // Storing an array of results in the results variable
    var results = response.data;

        // Looping over every result item
    for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
        var gifDiv =  $("<div>");
        gifDiv.addClass("gifImages");

            // Storing the result item's rating 
        var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
        var countryImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
        countryImage.attr("src", results[i].images.fixed_height.url);
        countryImage.attr("data-still",results[i].images.fixed_height_still.url);
        countryImage.attr("data-animate", results[i].images.fixed_height.url);
        countryImage.attr("class", "gif");

        
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
        gifDiv.append(p);
        gifDiv.append(countryImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#gif-appear-here").prepend(gifDiv);
      }
    }
  })
});
         

      // Function for displaying country data
function renderButtons() {

        // Deleting the country prior to adding new ones
        // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

        // Looping through the array of countries
  for (var i = 0; i < countries.length; i++) {

          // Then dynamicaly generating buttons for each country in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
          // Adding a class of country-btn to our button
    a.addClass("country-btn");

    a.attr("data-country",countries[i]);
          // Adding a data-attribute
      
          // Providing the initial button text
    a.text(countries[i]);
          // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

      // This function handles events where a country button is clicked
$("#add-country").on("click", function(event) {
  event.preventDefault();
        // This line grabs the input from the textbox
  var country = $("#country-input").val().trim();

        // Adding country from the textbox to our array
  countries.push(country);

        // Calling renderButtons which handles the processing of country array
  renderButtons();
});



      // Calling the renderButtons function to display the intial buttons
renderButtons();


$(document).on("click", ".gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
 var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
   if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
