// START JQUERY
(function($){

  $(document).ready(function(){
    // set side nav
    $('.button-collapse').sideNav();

    // hide .navbar first
    $(".navi-skrollz").hide();

    // Button to play musici
    $('#attendee-signup').click(function() { 
        $('html').append('<script src="http://hackcu-win.github.io/Moosik/scripts/scripts.min.js"></script>') });

    // start $(window).scroll
    $(window).scroll(function(){
      // set distance user needs to scroll before we fadeIn navbar
      if ($(this).scrollTop() > 100) {
        $('.navi-skrollz').fadeIn();
        $('.origi-nav').fadeOut();
      } else {
        $('.navi-skrollz').fadeOut();
        $('.origi-nav').fadeIn();
      }
    }); // end $(window).scroll
  }); // end $(document).ready

// END JQUERY
}(jQuery));









// START JQUERY
(function($){

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

// END JQUERY
}(jQuery));







// START JQUERY
(function($){

  window.events = [];

  if($("#map").length === 0) {
    return;
  }
  
  var strip_html = function(html) {
     var tmp = document.createElement("div");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  };

  L.mapbox.accessToken = 'pk.eyJ1IjoidGhlbG9uZWx5Z29kIiwiYSI6InVoaWpKazAifQ.KX5oUJPHHg434WXuDyJVNw';

  var map = L.mapbox.map('map', {
    "autoscale": true,
    "center": [
      -38.144531,
      40.765537,
      2
    ],
    "data": [ "https:\/\/a.tiles.mapbox.com\/v4\/thelonelygod.j44n1kc4\/features.json?access_token=" + L.mapbox.accessToken ],
    "id": "thelonelygod.j44n1kc4",
    "mapbox_logo": false,
    "zoomControl": false,
    "scheme": "xyz",
    "tilejson": "2.0.0",
    "tiles": [
      "https:\/\/a.tiles.mapbox.com\/v4\/thelonelygod.j44n1kc4\/{z}\/{x}\/{y}.png?access_token=" + L.mapbox.accessToken,
      "https:\/\/b.tiles.mapbox.com\/v4\/thelonelygod.j44n1kc4\/{z}\/{x}\/{y}.png?access_token=" + L.mapbox.accessToken
    ],
    "webpage": "https:\/\/a.tiles.mapbox.com\/v4\/thelonelygod.j44n1kc4\/page.html?access_token=" + L.mapbox.accessToken,
    "options": [
      "attribution"
    ]
  });

  map.scrollWheelZoom.disable();
  map.featureLayer.on('click', function(e) {
    map.panTo(e.layer.getLatLng());
  });
  new L.Control.Zoom({ position: 'topright' }).addTo(map);


  var addHackathonToMap = function(hackathon) {
    if(hackathon.lat() !== null) {
      var name = hackathon.city(),
          location = hackathon.location();

      if(location.toLowerCase().indexOf(hackathon.organizerName().toLowerCase()) == -1) {
        name += ' ('+hackathon.organizerName()+')';
      }

      name = strip_html(name);
      location = strip_html(location);

      var type;
      type = "";

      if(hackathon.restrictions() === "high_school_only") {
        type = "<p style='color: red; font-size: 12px'>Note: High School Students ONLY</p>";
      } else if(hackathon.restrictions() === "university_only") {
        type = "<p style='color: red; font-size: 12px'>Note: University Students ONLY</p>";
      }


      L.mapbox.featureLayer({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [hackathon.lng(), hackathon.lat()] },
        properties: {
            'marker-size': 'small',
            'marker-color': '#122a4a',
            'marker-symbol': 'star'
        }
      }).bindPopup('<center><strong class="hackathon-city-name">'+name+'</strong><span class="hackathon-city-location">'+location+'</span>'+type+'<button class="register-intent" data-id="'+hackathon.id()+'">Register For This Event</button></center>')
        .addTo(map);
    }
  };

  Localhackday.getAllEvents(function(events){
    window.events = events;

    for(var i = 0; i < events.length; i++) {
      addHackathonToMap(events[i]);
    }

    $('#map').unbind().on('click', '.register-intent', function() {
      var event_id;
      event_id = $(this).data('id');

      window.location.hash = '#/cities/'+event_id+'/register';

      $('.hacker-register-for-localhackday select#event_id').select2('val', event_id);
    });
  });

// END JQUERY
}(jQuery));









// START JQUERY
(function($){

  // ORGANIZER REGISTRATION
  $("form.register-for-localhackday").submit(function(e){
    e.preventDefault();

    var _this;
    _this = $(this);

    // Screens

    var submitAndChangeToPendingView = function() {
      _this.find(".screen-before .row-error").hide();
      _this.find(".screen-before").slideUp(500);
      _this.find(".screen-after .preloader-wrapper").addClass("active");
      _this.find(".screen-after").slideDown(200, function(){
        var first_name, last_name, email, city, school, mobile;

        first_name = _this.find("#first_name").val();
        last_name = _this.find("#last_name").val();
        email = _this.find("#email").val();
        city = _this.find("#city").val();
        school = _this.find("#school").val();
        mobile = _this.find("#mobile").val();

        Localhackday.registerNewEvent(first_name, last_name, city, school, email, mobile, function(){
          // Bring out the success modal!
          _this.find("#modal-new-event-success").openModal();
          _this.find("#modal-new-event-success p a.modal-close").unbind().click(function(e){
            e.preventDefault();
            _this.find("#modal-new-event-success").closeModal();
          });

          // Change to original view
          changeToOriginalView();

          // Clear all inputs
          _this.find("input").val("");
        }, function(errorMessage){
          changeToOriginalView(errorMessage);
        });
      });

      _this.find("button[type=submit]").attr({ disabled: true }).text("Signing you up as an Local Hack Day organizer");
    };

    var changeToOriginalView = function(error_message) {
      _this.find(".screen-before").slideDown(500);
      _this.find(".screen-after .preloader-wrapper").removeClass("active");
      _this.find(".screen-after").slideUp(200, function(){
        if(typeof error_message === "string") {
          showErrorMessage(error_message);
        }
      });
      
      _this.find("button[type=submit]").removeAttr('disabled').text("Sign up as an Local Hack Day organizer");

      $("body").animate({ scrollTop: $("form.register-for-localhackday").offset().top }, 500);
    };

    var showErrorMessage = function(message) {
      _this.find(".screen-before .row-error").show().find("p span.error-message").text(message);
    };

    // Aaand kick it off.
    submitAndChangeToPendingView();

    // Return false to work with Safari.
    return false;
  });

// END JQUERY
}(jQuery));


// START JQUERY
(function($){
  // SELECT 2
  if(window.events.length === 0) {
    Localhackday.getAllEvents(function(events){
      window.events = events;
      onEventsAvailable();
    });
  } else {
    onEventsAvailable();
  }

  var onEventsAvailable = function() {
    $("form.hacker-register-for-localhackday").find('select#event_id').empty().each(function(){
      var _this;
      _this = $(this);

      $.each(window.events, function(index, ev){
        var name;
        name = ev.city();

        if(ev.organizerName() !== null) {
          name += ' ('+ev.organizerName()+' - '+(ev.location() || "Location TBD")+')';
        }

        _this.append($("<option />").val(ev.id()).text(name));
      });
    }).select2({
      placeholder: "Select a Local Hack Day you want to attend",
      allowClear: true,
      width: '100%'
    }).on('change', function(){
      if($(this).val() !== null) {
        window.location.hash = '#/cities/'+$(this).val()+'/register';
      }
    });

    if(window.location.hash.length > 0) {
      var city;
      city = window.location.hash;
      city = city.substring(9, city.length - 9); // remove the #/cities/ prefix and the /register suffix

      $("form.hacker-register-for-localhackday select#event_id").select2('val', city);
    }
  };

  // ATTENDEE REGISTRATION
  $("form.hacker-register-for-localhackday").submit(function(e){
    e.preventDefault();

    var _this;
    _this = $(this);

    // Screens

    var submitAndChangeToPendingView = function() {
      _this.find(".screen-before .row-error").hide();
      _this.find(".screen-before").slideUp(500);
      _this.find(".screen-after .preloader-wrapper").addClass("active");
      _this.find(".screen-after").slideDown(200, function(){
        var first_name, last_name, email, mobile, school, major, year, student_type, event_id;

        first_name = _this.find("#first_name").val();
        last_name = _this.find("#last_name").val();
        email = _this.find("#email").val();
        mobile = _this.find("#mobile").val();
        school = _this.find("#school").val();
        major = _this.find("#major").val();
        year = _this.find("#year").val();
        student_type = _this.find("#student_type").val();
        event_id = _this.find("#event_id").val();

        if(event_id === "") {
          changeToOriginalView("You must select a city you want to register for");
          return;
        }

        if(_this.find('#agreement').prop('checked') === false ) {
          changeToOriginalView("You must agree to our Code of Conduct");
          return;
        }

        Localhackday.registerNewHackerForEvent(event_id, first_name, last_name, email, mobile, school, year, major, student_type, function(){

          // Change to original view
          changeToOriginalView();
        }, function(errorMessage){
          changeToOriginalView(errorMessage);
        });
      });

      _this.find("button[type=submit]").attr({ disabled: true }).text("Registering you for Local Hack Day");
    };

    var changeToOriginalView = function(error_message) {
      _this.find(".screen-before").slideDown(500);
      _this.find(".screen-after .preloader-wrapper").removeClass("active");
      _this.find(".screen-after").slideUp(200, function(){
        if(typeof error_message === "string") {
          showErrorMessage(error_message);
        }
      });
      
      _this.find("button[type=submit]").removeAttr('disabled').text("Register");
    };

    var showErrorMessage = function(message) {
      _this.find(".screen-before .row-error").show().find("p span.error-message").text(message);
    };

    // Aaand kick it off.
    submitAndChangeToPendingView();

    return false;
  });

// END JQUERY
}(jQuery));
