

$(document).ready(function() {

  console.log("Document is Ready");

  document.getElementById("change").text = "This is the New Text";

})







// ------------------------------------------------------------------------
// Trips Array
// ------------------------------------------------------------------------

const browseTrips = [
    {
        image: "photos-from-bahamas--the-exumas-941470810-c78152620c954f70903dc12efd67d80b",
        name: "Trips#1",
        price: 16905,
        description: "lorem",
        tripsPrice: "low",
        addedDate: "10/09/2024",
        origin: ""
    },
    {
        image: "photos-from-bahamas--the-exumas-941470810-c78152620c954f70903dc12efd67d80b",
        name: "Trips #2",
        price: 16905,
        description: "lorem",
        tripsPrice: "low",
        addedDate: "10/09/2024",
        origin: ""
    },
    {
        image: "photos-from-bahamas--the-exumas-941470810-c78152620c954f70903dc12efd67d80b",
        name: "Trips #3",
        price: 16905,
        description: "lorem",
        tripsPrice: "low",
        addedDate: "10/09/2024",
        origin: ""
    },
    {
        image: "photos-from-bahamas--the-exumas-941470810-c78152620c954f70903dc12efd67d80b",
        name: "Trips #4",
        price: 16905,
        description: "lorem",
        tripsPrice: "low",
        addedDate: "10/09/2024",
        origin: ""
    },
    {
        image: "photos-from-bahamas--the-exumas-941470810-c78152620c954f70903dc12efd67d80b",
        name: "Trips #5",
        price: 16905,
        description: "lorem",
        tripsPrice: "low",
        addedDate: "10/09/2024",
        origin: ""
    },
    {
        image: "photos-from-bahamas--the-exumas-941470810-c78152620c954f70903dc12efd67d80b",
        name: "Trips #6",
        price: 16905,
        description: "lorem",
        tripsPrice: "low",
        addedDate: "10/09/2024",
        origin: ""
    },
  ];
  
  let appliedFilter = "";
  let appliedSort = "date added";
  
  // ------------------------------------------------------------------------
  // When the document loads
  // ------------------------------------------------------------------------
  
  $(document).ready(function(){
  
      console.log("Test");
  
      // ------------------------------------------------------------------
      // Home
  
      // When the document loads, animate the hero image upwards
      $("#hero-image").animate({top: '-=100px'});
  
      // ------------------------------------------------------------------
      // Browse
  
      filterSortTrips();
  
  });
  
  // ------------------------------------------------------------------------
  // Load all trips
  // ------------------------------------------------------------------------
  
  function loadTrips(tripsToShow) {
  
    // Clear all elements inside the trips cards container
  
    $("#tripsContainer").empty();
  
    // Loop though trips
  
    for (let i = 0; i < tripsToShow.length; i++) {
      const trip = tripsToShow[i];
      
      console.log(trip.name);
  
      // Open weather API call for getting the temp
      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + trip.origin + "7ebea16af78c45a7c2040188f72f27e4",
        success: function (data) {
          tempData = data;
          console.log(tempData);
        },
      }).done(function () {
  
        // Set Temperature
        $(currentChild).find("#originTemp").text("Origin Temp: " + Math.round(tempData.main.temp- 273) + "°C");
       
      
      });
  
      // 1: Select the trips container add the trip card to it
      $("#tripsContainer").append($("#tripCardTemplate").html());
  
      // 2: Create a variable that contains the most recently added trip card
      let currentChild = $("#tripsContainer").children().eq(i);
  
      // 3: Set the content for the current trip card from the trip array
      $(currentChild).find("#nameText").text(trip.name);
      $(currentChild).find("#priceText").text("R" + trip.price);
      $(currentChild).find("#descriptionText").text(trip.description);
      $(currentChild).find(".card-img-top").attr('src','assets/' + trip.image);
  
      // 4: Hide the description text from the curent card
      $(currentChild).find("#descriptionText").hide();
      $(currentChild).find("#originTemp").hide();
  
    };
  
  };
  
  // ------------------------------------------------------------------------
  // When a filter or sort option is clicked
  // ------------------------------------------------------------------------
  
  $("input[name='filterRadio']").click(function(){
    appliedFilter = $(this).attr('value');
  
    filterSortTrips();
  });
  
  $("input[name='sortRadio']").click(function(){
    appliedSort = $(this).attr('value');
  
    filterSortTrips();
  });
  
  function filterSortTrips() {
    
    let filteredSortedBrowseTrips = [];
  
    console.log(appliedFilter);
    console.log(appliedSort);
  
    // Filter Trips
  
    if (appliedFilter) {
      filteredSortedBrowseTrips = browseTrips.filter(trip => trip.tripsPrice == appliedFilter);
    } else {
      filteredSortedBrowseTrips = browseTrips;
    }
  
    // Sort Trips
  
    if (appliedSort == "low to high") {
  
      // Sort trips from the lowest to highest price
      filteredSortedBrowseTrips = filteredSortedBrowseTrips.sort((a, b) => {
        return a.price - b.price;
      });
  
    } else if (appliedSort == "date added") {
  
      // Sort trips from the newest to oldest
      filteredSortedBrowseTrips = filteredSortedBrowseTrips.sort((a, b) => {
        let da = new Date(a.addedDate);
        let db = new Date(b.addedDate);
      
        return db - da;
      });
  
    }
  
    console.log(filteredSortedBrowseTrips)
  
    loadTrips(filteredSortedBrowseTrips);
  
  }
  
  // ------------------------------------------------------------------------
  // When a trip card is clicked
  // ------------------------------------------------------------------------
  
  $("#tripsContainer").on('click','.card', function() {
  
    // Toggle the price & description text
    $(this).find("#priceText").toggle();
    $(this).find("#descriptionText").toggle();
    $(this).find("#originTemp").toggle();
  
    // Resize the image to fit the additional content
    $(this).find(".card-img-top").toggleClass("small");
  
  });



// ----------------------------------------------------------------
  // When remove icon is clicked
  // ----------------------------------------------------------------

  $(document).on('click', ".delete", function(){
    $(this).parents("tr").remove();
    $(".add-new").removeAttr("disabled");
  })








  
  // https://api.openweathermap.org/data/2.5/weather?q=Pretoria&appid=0c8a911e5c7f8e5a03991afe2075de21
  
  // $(document).ready(function(){
  //   var $newTemp = $("#temp");
    
  //   $.ajax({
  //     type: "GET",
  //     url: "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=7ebea16af78c45a7c2040188f72f27e4",
  //     success: function (data) {
  //       temp = data;
  //       console.log(temp);
  //     },
  //   }).done(function () {
  //     // Set Temperature
  //     $newTemp.html(temp.main.temp + " &degC");
    
  //   });
  
  // })


