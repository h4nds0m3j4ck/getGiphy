$(document).ready(function() {
    //Array for searched topics to be added
    var topics = [];
        
    //This Function with AJAX call to GIPHY; parameter for API link set to search term with a limit of 10 results
    function displayAnimals() {
        
    var x = $(this).data("search");
    console.log(x);
        
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=GvPmqlquF9kXkVVuAhxaW4p2rzd5Fvvc&limit=10";
    console.log(queryURL);
        
        $.ajax({
        url: queryURL,
        method: "GET"
        })
            
        .then(function(response) {
        var results = response.data;
        console.log(results);
                    
        for (var i = 0; i < results.length; i++) {
                    
        var animalDiv = $("<div class='col-md-4'>");
        
        var rating = results[i].rating;
        var defaultAnimatedSrc = results[i].images.fixed_height.url;
        var staticSrc = results[i].images.fixed_height_still.url;
        var animalImage = $("<img>");
        var p = $("<p>").text("Rating: " + rating);
        
        animalImage.attr("src", staticSrc);
        animalImage.addClass("animalGiphy");
        animalImage.attr("data-state", "still");
        animalImage.attr("data-still", staticSrc);
        animalImage.attr("data-animate", defaultAnimatedSrc);
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#gifArea").prepend(animalDiv);
        
        }
        });
        }
    
        //Submit button click takes search term from form input, trims and pushes to topics array and displays button
        $("#addAnimal").on("click", function(event) {
            event.preventDefault();
            var newAnimal = $("#animalsInput").val().trim();
            topics.push(newAnimal);
            console.log(topics);
            $("#animalsInput").val('');
            displayButtons();
            });
        
        //This Function iterates through topics array to display button with array values in "myButtons"
            function displayButtons() {
            $("#myButtons").empty();
            for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "animal");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
            }
          }
        
        displayButtons();
        
        //this button with id of "animal" executes displayAnimals function
        $(document).on("click", "#animal", displayAnimals);
        
        //Click event on gifs with class of "animalGiphy" executes pausePlayGifs function
        $(document).on("click", ".animalGiphy", pausePlayGifs);
        
        //This function accesses "data-state" and depending on the  status, changes the image to "data-animate" or "data-still"
        function pausePlayGifs() {
        var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } 
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
          }
        }
        
        });