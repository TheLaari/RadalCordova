// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        console.log("navigator.geolocation works well");
        // Handle the Cordova pause and resume events
        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var onSuccess = function (position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                  'Longitude: ' + position.coords.longitude + '\n' +          
                  'Accuracy: ' + position.coords.accuracy + '\n' +
                  'Timestamp: ' + position.timestamp + '\n');
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

       

        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        
            $.ajax({
                type: 'GET',
                url: 'https://rata.digitraffic.fi/infra-api/0.2/rautatieliikennepaikat.json?count=500&propertyName=nimi&propertyName=tunniste&propertyName=uicKoodi&propertyName=virallinenSijainti&time=2017-03-02T00%3A00%3A00Z%2F2017-03-02T00%3A00%3A00Z',
                contentType: "application/json",
                dataType: 'json',
                success: function (data) {
                    $('#jsonp-results').html(JSON.stringify(data));
                    console.log(data);
                },
                error: function (e) {
                    alert(e.message);
                }

            });

            function closestLocation(targetLocation, locationData) {
                function vectorDistance(dx, dy) {
                    return Math.sqrt(dx * dx + dy * dy);
                }

                function locationDistance(location1, location2) {
                    var dx = location1.latitude - location2.latitude,
                        dy = location1.longitude - location2.longitude;

                    return vectorDistance(dx, dy);
                }

                return locationData.reduce(function (prev, curr) {
                    var prevDistance = locationDistance(targetLocation, prev),
                        currDistance = locationDistance(targetLocation, curr);
                    return (prevDistance < currDistance) ? prev : curr;
                });
            }

            var data = {
                "Locations": {
                    "Location": [
                        {
                    }
                    ]
                }
            },
                targetLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                closest = closestLocation(targetLocation, data.Locations.Location);
        // closest is now the location that is closest to the target location
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();