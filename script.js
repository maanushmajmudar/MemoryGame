// Wait for the document to load and then execute the function
$(document).ready(function () {

  // Declare and initialize variables
  let images = []; // stores image file names
  let cards = []; // stores cards with their corresponding images
  let available_cards = cards.length; // total number of available cards
  let match = -1; // stores the image of the first card clicked
  let match_id; // stores the ID of the first card clicked
  let score = 0; // stores the number of correct matches
  let storage = []; // stores the images used for each card
  let game_completed = false; // indicates whether the game is completed or not
  let attempts = 0; // stores the number of attempts made
  let percentage = 0; // stores the percentage of correct matches
  let cards_opened = 0; //stores the number of cards currently opened
  setUI(); // call the setUI function to render the user interface

  // Initialize the tabs view
  $('#tabs').tabs(); // select the first tab by default

  // Handle click events on the tabs
  $("#tabs>div a[href^='#']").on("click", function () {
    if ($(this).attr("href") != "#") { // if the clicked tab is not the current tab
      let index = $($(this).attr("href")).index() - 1; // get the index of the selected tab
      $("#tabs").tabs("option", "active", index); // activate the selected tab
    }
    return false
  })

  // Function to render the user interface
  function setUI() {
    // Get the number of cards and player name from session storage or use default values
    let num_of_cards = sessionStorage.getItem("Cards") ?? 48;
    let player_name = sessionStorage.getItem("Player") ?? "Gamer";
    init(num_of_cards); // initialize the game with the given number of cards
    $("#player").text("Player: " + player_name); // display the player name
    let rownum = 1; // initialize the row number to 1
    let rowid; // initialize the row ID
    // Loop through the cards and add them to the UI
    for (let i = 0; i < num_of_cards; i++) {
      if (i % 8 == 0) { // if 8 cards have been added to the row
        rowid = "row" + rownum; // generate a new row ID
        $("#cards").append(`<div id=${rowid}> </div>`); // create a new row element
        rownum++; // increment the row number
      }
      const id = "card" + (i + 1); // generate a unique ID for the card
      $(`#${rowid}`).append(`<a href="#"  id=${id}> <img src="images/back.png"  class="defaultCard"  alt = "Back"/> </a>`) // add the card element to the UI
      storage[i] = cards.pop(); // assign an image to the card and remove it from the available cards
      // Add a click event listener to each card
      $(`#${id}`).on("click", (e) => {
        e.preventDefault();
        //Check for number of cards opened at an instance
        if (cards_opened >= 2) {
          alert("More than two cards can't be opened at an instance");
          cards_opened = 0;
          return;
        }
        else {
          cards_opened++;
        }
        if ($(`#${id} > img`).attr("src") == "images/back.png") { // if the card is facing down
          $(`#${id} > img`).fadeToggle(500); // flip the card
          $(`#${id} > img`).attr("src", "images/blank.png"); // show the image
          $(`#${id} > img`).fadeIn(500);// animation
          let vis = storage[i]; // get the image source for the clicked card
          $(`#${id} > img`).attr("src", vis); // show the image of the clicked card
          if (match == -1) { // if this is the first card clicked
            match = vis; // set match to the image source of the clicked card
            match_id = id; // save the ID of the clicked card
          }
          else if (match == vis) { //matching condition 
            setTimeout(() => {// First Card
              $(`#${id} > img`).slideUp(1000); // slide up the clicked card
              // Second Card
              $(`#${match_id} > img`).slideUp(1000); // slide up the first clicked card
              match = -1; // reset the match variable
              match_id = ""; // reset the match ID variable
              attempts++; // increment the number of attempts
              score++; // increment the number of score
              percentage = ((score / attempts) * 100).toFixed(2); // calculate the percentage of correct matches
              $("#correct").text("Correct: " + percentage + "%"); // update the percentage of correct matches displayed on the UI
              (score == (num_of_cards / 2)) ? (game_completed = true) : (game_completed = false); // check if the game has been completed
              if (game_completed) {
                let highscore = localStorage.getItem(player_name); // get the current highscore for the player
                if (highscore === null || parseFloat(highscore) < percentage) {
                  localStorage.setItem(player_name, percentage);
                  highscore = percentage;
                }
                $("#high_score").text("High score: " + highscore); // update the highscore displayed on the UI
                alert("Congratulations! You won!."); // display a message to the user
                window.location.href = "#"; // redirect the user to the top of the page
              }
              
              cards_opened = 0;   //reset cards_opened
            }, 2000)
          }
          else {
            // First Card
            setTimeout(() => {
              $(`#${match_id} > img`).fadeOut(500); // fade out the first clicked card
              $(`#${match_id} > img`).attr("src", "images/back.png"); // flip the first clicked card to show the back side
              $(`#${match_id} > img`).fadeIn(500); // fade in the first clicked card
              // Second Card
              $(`#${id} > img`).fadeIn(500); // fade in the clicked card
              $(`#${id} > img`).attr("src", "images/back.png"); // flip the clicked card to show the back side
              cards_opened = 0;
            }, 2000);    // wait for 2 seconds before executing the above code
            match = -1; // reset the match variable
            attempts++; // increment the number of attempts
          }
        }
      });
    }
  }

  //initialize arrays
  function init(num_of_cards = 48) {
    let itr = num_of_cards / 2; // calculate the number of pairs of cards needed
    // initialize image assets
    for (let i = 1; i <= 24; i++) {
      let element = "images/card_" + i + ".png"; // get the path of the image asset
      images.push(element); // add the path to the images array
    }
    // console.log(images);
    // Random indexes; 
    let indexes = [];
    for (let i = 0; i < itr; i++) {

      let vf = Math.floor(Math.random() * 24); // generate a random index between 0 and 23 (inclusive)
      if (indexes.includes(vf)) { // check if the index is already in the array
        i--; // if it is, decrement the index counter and try again
      } else {
        indexes.push(vf); // if the index is unique, add it to the array
      }
    }
    console.log(indexes); // log the randomly generated indexes to the console

    // The generated indexes will be used to select images for the cards.

    // Random cards
    // Looping through the indexes array to randomly push/unshift images into the cards array
    for (let i = 0; i < itr; i++) {
      // If the result of Math.random() is greater than 0.5, push the image into the cards array
      if (Math.random() > 0.5)
        cards.push(images[indexes[i]]);
      // Otherwise, unshift the image into the cards array
      else
        cards.unshift(images[indexes[i]]);
    }

    // Looping through the indexes array again to randomly unshift/push images into the cards array
    for (let i = 0; i < itr; i++) {
      // If the result of Math.random() is greater than 0.5, unshift the image into the cards array
      if (Math.random() > 0.5)
        cards.unshift(images[indexes[i]]);
      // Otherwise, push the image into the cards array
      else
        cards.push(images[indexes[i]]);
    }

    // Set the available_cards variable to the length of the cards array and log it to the console
    available_cards = cards.length;
    console.log(cards);
  }

  // Saving Settings
  // When the "save_settings" button is clicked, set the player_name variable to the value of the input field, or "Gamer" if the input field is empty
  $("#save_settings").click(() => {
    player_name = ($("#player_name").val().toString() == "") ? ("Gamer") : ($("#player_name").val().toString());
    // Set the num_of_cards variable to the value of the input field
    let num_of_cards = $("#num_cards").val();
    // Use sessionStorage to store the player_name and num_of_cards values
    sessionStorage;
    sessionStorage.setItem("Player", player_name);
    sessionStorage.setItem("Cards", num_of_cards);
    // Reload the page with the new settings
    window.location.reload(true);
  })

});