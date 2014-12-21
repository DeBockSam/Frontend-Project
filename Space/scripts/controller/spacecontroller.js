
//global variables
var currentheigth;
var spaceshipPosition;

var screenHeight;
var controller;


//self invoking function


//document ready: de DOM is genoeg geladen om javascript code uit te voeren
//Experienced developers sometimes use the shorthand $() for $( document ).ready()
$(document).ready(function($) {
        //region de positie starten op de bodem van de pagina
    //de nodige setup van het scherm doen
    setupScreen();

    //initialiseren van de animatiecontroller
    controller = new ScrollMagic();

    //region geolocatie opvragen
    (function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    })();

    //endregion
    //region Via geolocatie de weerstatus opvragen
    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude)

        var url = "https://api.metwit.com/v2/weather/?location_lat=" + position.coords.latitude + "&location_lng=" + position.coords.longitude;


        //data is van type plainobject
        $.getJSON(url, function(data){
            var items = [];

            /* loop through array */
            var i =0;
            console.log(data.objects[0].weather.status);

            /*$.each( data, function( key, value ) {

             console.log(key + ' / ' + value[i].weather.status);
             i++;
             });*/

        });


    }
    //endregion
});


//window load: deze functie zal starten eens dat de gehele page geladen is (niet gewoon de DOM dus)
$( window ).load(function() {
    //probleem: images zijn nog niet geladen bij document.ready. we moeten de window.load gebruiken zodat ze zeker ingeladen zijn.

    //region Ruimteschip id opvragen en op bodem pagina plaatsen

    //het spaceship element opvragen
    var spaceship = document.getElementById("spaceship");

    //via jquery de heigth van het spaceship ophalen
    var spaceshipHeight = $(spaceship).height();
    screenHeight = $(window).height();
    //het spaceship zijn startpositie bepalen aan de hand van de bodem van de pagina en de grootte van het schip
    //var spaceshipPosition ="1000px" ;

    //spaceship.style.bottom = "1000px";
    //we zetten zo de raket neer nabij de bodem
    //logica: deze "startpositie" die we meegeven is eigelijk de situatie van het object na de animatie
    //de animaties gebeuren in de omgekeerde volgorde dus we werken toe naar zijn beginsituatie
    $("#spaceship").css({bottom: "2000px"});
    $("#earth").css({"bottom": (1000 - screenHeight/2) + "px"});


    //get bottom of element within the window
    //var bottom = $(window).height() - $("#earth").offset().top - $("#earth").height();


    //we herladen naar de bodempositie
    location.href = "#bottom";

    //aarde standaard weergave tonen en daar een overlay op leggen eens het weer is binnengehaald. aarde in div bottom zetten


    //console.log("spaceship stijl bottom: " + spaceship.style.bottom + "spaceship height: " + $(spaceship).height() );
//endregion

    TweenLite.defaultEase = Linear.easeNone;


    //region Alle animaties voor het opstijgen van het ruimteschip
    //tween die ruimteschip van de bodem naar duizend pixels op zijn plaats houdt
    var tweenBeforeLiftOff = new TimelineMax()
        .add(
        TweenMax.to("#spaceship", 0.5, {"bottom":"0px"})
    );

    //tween die de aarde tot aan duizend pixels op zijn plaats houdt
    var tweenBeforeLiftOffPinEarth = new TimelineMax()
        .add(
        TweenMax.to("#earth", 0.5, {"bottom":"0px"})
    );

    //tween die het ruimteschip doet trillen voor het opstijgen
    var tweenBeforeLiftOff2 = new TimelineMax()
        .add(
        //TweenMax.fromTo(spaceship,1,{"left": $(spaceship).left() -15},{"left": $(spaceship).left() +15,repeat:-1, yoyo:true,ease: Circ.easeInOut})
        TweenLite.fromTo(spaceship, 2,{x:-10}, {x:0, ease:RoughEase.ease.config({points:50, template:Circ.easeOut, randomize:false}) })
    );


    var beforeLiftOff = new ScrollScene({
        triggerElement: "#triggerStart",
        duration:1000 - screenHeight/2

    })
        .setTween(tweenBeforeLiftOff);

    var beforeLiftOff2 = new ScrollScene({
        triggerElement: "#triggerStart",
        duration:1000 - screenHeight/2

    })
        .setTween(tweenBeforeLiftOff2);

    var beforeLiftOff3 = new ScrollScene({
        triggerElement: "#triggerStart",
        duration:1000 - screenHeight/2

    })
        .setTween(tweenBeforeLiftOffPinEarth);
    //endregion

    /*.add([
     TweenMax.to("#slide", 0.3, {backgroundColor: "green"}),
     TweenMax.to("#slide h3:last-child", 0.3, {color: "red"})
     ])*/


    //region Alle animaties tijdens het opstijgen van de raket

    //het opstijgen van de raket naar het midden van het scherm
    var tweenLiftOff = new TimelineMax()
        .add(
        TweenMax.to(spaceship, 0.5, {"bottom": (1000 - screenHeight/2) + "px"})
    );

    //vuur uit de raket moet hier toegevoegd worden

    //wolken die naar onder bewegen

    //verlagen van opacity naar de achtergond

    var liftOff = new ScrollScene({
        //ruimteschip + alle raketten moeten trillen
        //rook moet uit zijraketten komen
        triggerElement: "#triggerLiftOff",
        duration: 1000
    })
        .setTween(tweenLiftOff);
    //endregion
    //region Alle scenes worden toegevoegd aan de controller
    controller.addScene(liftOff);
    controller.addScene(beforeLiftOff);
    controller.addScene(beforeLiftOff2);
    controller.addScene(beforeLiftOff3);
    //endregion
    //region De indicators worden toegevoegd aan de testomgeving
    beforeLiftOff.addIndicators();
    liftOff.addIndicators();
    beforeLiftOff3.addIndicators();
    beforeLiftOff2.addIndicators();
    //endregion





});

//doet een reload waarbij gedwongen de informatie van de server in plaats van de cache moet gehaald worden.
//location.reload(true);

//Een functie doe opgeroepen wordt voordat de pagina refreshed.
$(window).unload(function() {
    alert('Handler for .unload() called.');
});

/*
$(window).height();   // returns height of browser viewport
$(document).height(); // returns height of HTML document
$(window).width();   // returns width of browser viewport
$(document).width(); // returns width of HTML document
*/


$( window ).resize(function() {
    setupScreen();
});


function setupScreen(){
    //bottomPosition = $(document).height();

};