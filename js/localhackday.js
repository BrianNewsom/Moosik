(function($){

  /**
   * The LocalhackDayEvent (which allows you to manipulate results from Localhackday.getAllEvents)
   */
  var LocalhackdayEvent;
  LocalhackdayEvent = function(data) { this.raw = data; };
  LocalhackdayEvent.prototype.id = function() { return this.raw.id; }
  LocalhackdayEvent.prototype.city = function() { return this.raw.city; }
  LocalhackdayEvent.prototype.restrictions = function() { return this.raw.restrictions; }
  LocalhackdayEvent.prototype.location = function() { return this.raw.geo.address; }
  LocalhackdayEvent.prototype.lat = function() { return this.raw.geo.lat; }
  LocalhackdayEvent.prototype.lng = function() { return this.raw.geo.lng; }
  LocalhackdayEvent.prototype.ll = function() { return [this.raw.geo.lat, this.raw.geo.lng]; }
  LocalhackdayEvent.prototype.organizerImage = function() { return this.raw.organizers.image; }
  LocalhackdayEvent.prototype.organizerName = function() { return this.raw.organizers.name; }
  LocalhackdayEvent.prototype.organizerOrganization = function() { return this.raw.organizers.organization; }
  LocalhackdayEvent.prototype.organizerUrl = function() { return this.raw.organizers.url; }
  LocalhackdayEvent.prototype.toString = function() { return this.raw; };
  LocalhackdayEvent.prototype.registerHacker = function(first_name, last_name, email, mobile, school, year, major, student_type, callbackSuccess, callbackError) {
    Localhackday.registerNewHackerForEvent(this.id(), first_name, last_name, email, mobile, school, year, major, student_type, callbackSuccess, callbackError);
  };

  /**
   * The main Localhackday class.
   */

  var Localhackday = {
    base_url: "http://organizer.mlh.io/localhackday/api", // Base API URL

    // START View all events from the API
    /**
     * Example code:
     * Localhackday.getAllEvents(function(events){
     *   console.log(events);
     *   // events[0].registerHacker("Steven", "Smith", "stevensmith@example.com", "Steven High School", "2015", "History", function(){ console.log("Registered Steven Smith!"); })
     * });
     */
    getAllEvents: function(callback) {
      this.queryAPI("GET", "/events.json", null, function(response) {
        var events = response.events.map(function(ev){ return new LocalhackdayEvent(ev); });
        callback(events);
      }, function(errorMessage) {
        console.error("Localhackday API could not show events because: " + errorMessage);
      });

      return true;
    },
    // END View all events from the API




    // START Register new hackathon
    /**
     * Example code:
     * Localhackday.registerNewHackerForEvent("Jon", "Gottfried", "Nyack, NY", "jon@mlh.io", "01234567890", function(){
     *   console.log("New event has been registered! You should receive an email with your password & details.");
     * }, function(errorMessage){
     *   console.error(errorMessage);
     * })
     */
    registerNewEvent: function(first_name, last_name, city, school, email, mobile, callbackSuccess, callbackError) {
      this.queryAPI("POST", "/events/new.json", {
        first_name: first_name,
        last_name: last_name,
        city: city,
        school: school,
        email: email,
        mobile: (typeof mobile !== "undefined") ? mobile : ""
      }, callbackSuccess, callbackError);

      return true;
    },
    // END Register new hackathon




    // START Register hacker for existing Localhackday
    /**
     * Example code:
     * Localhackday.registerNewHackerForEvent("los-angeles-ca", "Shy", "Ruparel", "shy@mlh.io", "University of Cincinatti", "2015", "Computer Science", function(){
     *   console.log("Shy Ruparel has been registered for the los-angeles-ca event!");
     * }, function(errorMessage){
     *   console.error(errorMessage);
     * })
     */
    registerNewHackerForEvent: function(hackathon, first_name, last_name, email, mobile, school, year, major, student_type, callbackSuccess, callbackError) {
      if(typeof hackathon === "object") {
        hackathon = hackathon.id;
      }

      this.queryAPI("POST", "/events/" + (hackathon) + "/hackers/new.json", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile: mobile,
        school: school,
        year: year,
        major: major,
        student_type: student_type
      }, callbackSuccess, callbackError);

      return true;
    },
    // END Register hacker for existing Localhackday




    // START Pre-register hacker for existing Localhackday
    /**
     * Example code:
     * Localhackday.preregisterHacker("Shy", "Ruparel", "shy@mlh.io", "University of Cincinatti", function(){
     *   console.log("Shy Ruparel has been registered for the los-angeles-ca event!");
     * }, function(errorMessage){
     *   console.error(errorMessage);
     * })
     */
    preregisterHacker: function(first_name, last_name, email, school, callbackSuccess, callbackError) {
      this.queryAPI("POST", "/preregistration.json", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        school: school
      }, callbackSuccess, callbackError);

      return true;
    },
    // END Pre-register hacker for existing Localhackday




    // START General AJAX function
    queryAPI: function(method, resource, parameters, success, error) {
      return $.ajax({
        url: this.base_url + resource,
        method: method,
        data: parameters || {},
        dataType: "json",
        success: function(json, textStatus, jqXHR) {
          if(typeof success === "function" && json.status === "OK") {
            success(json);
          } else if(typeof error === "function") {
            error(json.message);
          } else {
            console.error(json.message);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          if(typeof error === "function") {
            error(textStatus);
          } else {
            console.error(textStatus);
          }
        }

      });
    }
    // END General AJAX function

  };




  /**
   * Assign as a global variable so we can use it outside of this script.
   */
  window.Localhackday = Localhackday;

})(jQuery);