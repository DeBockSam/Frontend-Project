﻿//globale variablen
var startScroll;
var currentScrollTop;
var lastScrollTop = 20000;
var scrollValue = 20000;
var scrollDirection;
var windowheight = $(window).height();   // returns height of browser viewport
var htmlheight = $(document).height(); // returns height of HTML document

//algemene variabelen
var earthHeight = windowheight * 0.10;
var shuttleHeight = windowheight * 0.20;
var atmosphere = $('#atmosphere');
var currentOpacity = "1"; //opacity van atmosphere
var needsLowering;
var needsMore;

//Animation trigger variabelen (is de animatie al voltooid of niet: anders herhaalt zich de animatie bij elke scroll beweging)ds
var earthAnimation;
var shuttleBeforeTakeOff;
var shuttleTakeOff;
var atmospherOpacity;
var issAnimatedIN;
var issAnimatedOUT = false;
var sputnikAnimatedIN;
var sputnikAnimatedOUT = false;
var creaturesAnimatedIN;
var creaturesAnimatedOUT = false;
var moonAnimationIN;
var moonAnimationOUT = false;
var marsAnimation;
var flameAnimation
var flameAnimationON = false;

//Animation ScrollPositions (keyframes om animatie te starten op die bepaalde scrollposition)
var earthAnimationPos = 18500;
//
var shuttleBeforeTakeoffPos = 19900;
var shuttleTakeoffPos = 18500;
//
var issAnimateINPos = 16000;
var issAnimatedOUTPos = 14000;
//
var sputnikAnimateINPos = 12000;
var sputkikAnimateOUTPos = 10000;
//
var creaturesAnimateINPos = 8000;
var creaturesAnimateOUTPos = 6000;
//
var moonAnimateINPos = 5000;
var moonAnimateOUTPos = 3500;
//
var marsAnimateINOUTPos = windowheight + 200;



//#region Weer gedeelte

$(document).ready ( function(){

    //Geolocatie opvragen
    (function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    })();

    //Via Geolocatie weerstatus opvragen van gegeven plaats
    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude)

        var url = "https://api.metwit.com/v2/weather/?location_lat=" + position.coords.latitude + "&location_lng=" + position.coords.longitude;


        //data is van type plainobject
        $.getJSON(url, function (data) {
            var items = [];

            /* loop through array */
            var i = 0;
            console.log(data.objects[0].weather.status);
            var weatherCondition = data.objects[0].weather.status;
            showWeather(weatherCondition);
            /*$.each( data, function( key, value ) {

             console.log(key + ' / ' + value[i].weather.status);
             i++;
             });*/

        });
    }

});

//ShowWeather
function showWeather(weatherCondition) {
    console.log(weatherCondition);
    //weatherCondition = 'snowy';
    //weatherCondition = 'rainy';
    //alert(weatherCondition);
    var earth = document.getElementById("earth");
    switch (weatherCondition) {
        case 'unknown':
            makeEarthClear(earth);
            break;
        case 'clear':
            makeEarthClear(earth);
            break;
        case 'rainy':
            makeEarthRainy(earth);
            break;
        case 'stormy':
            makeEarthRainy(earth);
            break;
        case 'snowy':
            makeEarthSnowy(earth);
            break;
        case 'partly cloudy':
            makeEarthRainy(earth);
            break;
        case 'cloudy':
            makeEarthRainy(earth);
            break;
        case 'hailing':
            makeEarthSnowy(earth);
            break;
        case 'heavy seas':
            makeEarthRainy(earth);
            break;
        case 'calm seas':
            makeEarthClear(earth);
            break;
        case 'foggy':
            makeEarthSnowy(earth);
            break;
        case 'snow flurries':
            makeEarthSnowy(earth);
            break;
        case 'windy':
            makeEarthRainy(earth);
            break;
    }
}

function makeEarthClear(earth) {
    document.getElementById("earth").style.backgroundColor = "forestgreen";
    //forceer een redraw van earth om te laten zien
    //$('#earth').hide().show(0);
}

function makeEarthSnowy(earth) {
    document.getElementById("earth").style.backgroundColor = "white";
    document.getElementById("atmosphere").className = "atmosphereSnowy";
    //earth.style.backgroundColor == "white";
    //$('#earth').hide().show(0);
}

function makeEarthRainy(earth) {
    //earth.style.backgroundColor == "#114411";
    document.getElementById("earth").style.backgroundColor = "#114411";
    document.getElementById("atmosphere").className = "atmosphereRainy";
    //$('#earth').hide().show(0);
}

//#endregion

//#region Animatie en site gedeelte

window.onload = function () {
    location.href = "#bottom";

    startScroll = window.scrollY + windowheight; // offset van window (bodem door + windowheight erbij te tellen
    console.log("Initial ScrollPosition: " + startScroll);

    UpdateInfo();

    //zorgt voor nodige setup zoals rumble selector enz op elementen
    AnimationsSetup();

    

    window.onscroll = function (event) {
        // called when the window is scrolled.
        UpdateInfo();

        //kijkt of we opwaarts of neerwaarts scrollen
        CheckScrollDirection();
            
        //kijkt of animatie moet gedaan worden of beeindigd worden
        CheckAnimations();
    }

    window.onresize = function (event) {
        startScroll = window.scrollY + windowheight;
        windowheight = $(window).height();
        earthHeight = windowheight * 0.10;
        shuttleHeight = windowheight * 0.20;
        window.location.reload();
        console.log("Initial ScrollPosition: " + startScroll);
        UpdateInfo();
    }
}

function UpdateInfo() {
    currentScrollTop = window.scrollY + windowheight;
    console.log("Current ScrollPosition: " + currentScrollTop);
    console.log("scrollValue = " + scrollValue);
}

function CheckScrollDirection() {
    if (currentScrollTop > lastScrollTop) {
        // downscroll code
        console.log("SCROLL DOWN")
        scrollDirection = "DOWN";
    } else {
        // upscroll code
        console.log("SCROLL UP")
        scrollDirection = "UP";
    }
    lastScrollTop = currentScrollTop;
}

function AnimationsSetup() {
    //Animaties die gebeuren bij het opstarten

    TweenMax.fromTo("#earthIntroMessage", 1, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });

    //vlam animatie aanmaken en direct pauzeren
    flameAnimation = new TimelineMax({ repeat: 0, yoyo: true })
            .add(TweenMax.to("#shuttleFire", 0.2, { opacity: 1 }))
            .add(TweenMax.to("#shuttleFire", 0.1, { opacity: 0 }))
            .add(TweenMax.to("#shuttleFire", 0.2, { opacity: 1 }))
            .add(TweenMax.to("#shuttleFire", 0.1, { opacity: 0 }));
    flameAnimation.pause();
    
}

function CheckAnimations() {
    current = window.scrollY + windowheight;

    $('#shipShaker').jrumble({
        speed:0
    });

    //#region Flame Animation
    if (current < earthAnimationPos && scrollDirection == "UP") {
        
        if (current >= moonAnimateOUTPos && current <= moonAnimateINPos) {
            //geen vlammetje oproepen want hier land hij op de maan
        } else {
            //alert("roep restart op");
            flameAnimationON = true;
            flameAnimation.restart();
        }
    }

    if (current < earthAnimationPos && scrollDirection == "DOWN") {
        flameAnimationON = false;
        flameAnimation.restart();
        flameAnimation.pause()
    }
    //#endregion
    
    //#region Earth Animation
    if (current <= earthAnimationPos && earthAnimation != true) {
        earthAnimation = true;
        //alert('hide earth');
        TweenMax.fromTo("#earth", 1, { css: { bottom: 0 } }, { css: { bottom: -(earthHeight) } });

        TweenMax.fromTo("#earthIntroMessage", 1, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }

    if (current > earthAnimationPos && earthAnimation == true) {
        earthAnimation = false;
        //alert('show earth');
        TweenMax.fromTo("#earth", 1, { css: { bottom: -(earthHeight) } }, { css: { bottom: 0 } });

        TweenMax.fromTo("#earthIntroMessage", 1, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }
    //#endregion

    //#region Shuttle BeforeTakeOff Animation
    if (current <= shuttleBeforeTakeoffPos && shuttleBeforeTakeOff != true) {
        shuttleBeforeTakeOff = true;
        //alert('start takeoff shake');
        $('#shipShaker').trigger('startRumble');
    }

    if (current > shuttleBeforeTakeoffPos && shuttleBeforeTakeOff == true) {
        shuttleBeforeTakeOff = false;
        //alert('stop takeoff shake');
        $('#shipShaker').trigger('stopRumble');
    }
    //#endregion

    //#region Shuttle TakeOff Animation
    if (current <= shuttleTakeoffPos && shuttleTakeOff != true) {
        shuttleTakeOff = true;
        //alert('shuttle takes off');
        TweenMax.fromTo("#shuttleWrapper", 2, { css: { bottom: earthHeight } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight } });

        TweenMax.fromTo("#shuttleFire", 2, { css: { bottom: earthHeight -10 } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight -10 } });
        $('#shipShaker').trigger('stopRumble');
    }

    if (current > shuttleTakeoffPos && shuttleTakeOff == true) {
        shuttleTakeOff = false;
        //alert('shuttle is about to land');
        TweenMax.fromTo("#shuttleWrapper", 2, { css: { bottom: (windowheight * 0.50) - shuttleHeight } }, { css: { bottom: earthHeight } });

        TweenMax.fromTo("#shuttleFire", 2, { css: { bottom: (windowheight * 0.50) - shuttleHeight - 10 } }, { css: { bottom: earthHeight -10 } });
    }
    //#endregion

    //#region ISS Part
    //#region Animate ISS in (when flying high enough)
    if (current <= issAnimateINPos && issAnimatedIN != true && issAnimatedOUT == false) {
        issAnimatedIN = true;
        //alert("eerste animatie");
        TweenMax.fromTo("#spaceStation", 1.5, { css: { top: -windowheight / 2 } }, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } });

        TweenMax.fromTo("#issMessage", 1.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }


    if (current > issAnimateINPos && issAnimatedIN == true) {
        issAnimatedIN = false;
        TweenMax.fromTo("#spaceStation", 1.5, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } }, { css: { top: -windowheight / 2 } });

        TweenMax.fromTo("#issMessage", 1, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }
    //#endregion

    //#region Animate ISS out (when flying higher)
    if (current <= issAnimatedOUTPos && issAnimatedIN == true && issAnimatedOUT != true) {
        issAnimatedOUT = true;
        issAnimatedIN = false;
        //alert("zou moeten uit animeren naar onder");
        TweenMax.fromTo("#spaceStation", 1.5, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } }, { css: { top: 3 * (windowheight / 2) } });


        TweenMax.fromTo("#issMessage", 1, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }


    if (current > issAnimatedOUTPos && issAnimatedIN != true && issAnimatedOUT == true) {
        issAnimatedOUT = false;
        issAnimatedIN = true;
        //alert("zou moeten in animeren van onder");
        TweenMax.fromTo("#spaceStation", 1.5, { css: { top: 3 * (windowheight / 2) } }, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } });

        TweenMax.fromTo("#issMessage", 2, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }
    //#endregion
    //#endregion
   
    //#region sputnik Part
    //#region Animate sputnik in (when flying high enough)
    if (current <= sputnikAnimateINPos && sputnikAnimatedIN != true && sputnikAnimatedOUT == false) {
        //alert("ik kom in sputnik animatie terecht")
        sputnikAnimatedIN = true;
        //alert("eerste animatie");
        TweenMax.fromTo("#sputnik", 1.5, { css: { top: -windowheight / 2 } }, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } });


        TweenMax.fromTo("#sputnikMessage", 2, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }


    if (current > sputnikAnimateINPos && sputnikAnimatedIN == true) {
        sputnikAnimatedIN = false;
        TweenMax.fromTo("#sputnik", 1.5, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } }, { css: { top: -windowheight / 2 } });

        TweenMax.fromTo("#sputnikMessage", 1, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }
    //#endregion

    //#region Animate sputnik out (when flying higher)
    if (current <= sputkikAnimateOUTPos && sputnikAnimatedIN == true && sputnikAnimatedOUT != true) {
        sputnikAnimatedOUT = true;
        sputnikAnimatedIN = false;
        //alert("zou moeten uit animeren naar onder");
        TweenMax.fromTo("#sputnik", 1.5, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } }, { css: { top: 3 * (windowheight / 2) } });

        TweenMax.fromTo("#sputnikMessage", 1, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }


    if (current > sputkikAnimateOUTPos && sputnikAnimatedIN != true && sputnikAnimatedOUT == true) {
        sputnikAnimatedOUT = false;
        sputnikAnimatedIN = true;
        //alert("zou moeten in animeren van onder");
        TweenMax.fromTo("#sputnik", 1.5, { css: { top: 3 * (windowheight / 2) } }, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } });

        TweenMax.fromTo("#sputnikMessage", 2, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }
    //#endregion
    //#endregion

    //#region Living creatures in space
    //#region Animate in (when flying high enough)
    if (current <= creaturesAnimateINPos && creaturesAnimatedIN != true && creaturesAnimatedOUT == false) {
        //alert("ik kom in de animeer in functie")
        creaturesAnimatedIN = true;
        TweenMax.fromTo("#shipAndCable", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#monkey", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#astronaut", 0.4, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });

        TweenMax.fromTo("#monkeyMessage", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#astronautMessage", 0.4, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }


    if (current > creaturesAnimateINPos && creaturesAnimatedIN == true) {
        creaturesAnimatedIN = false;
        TweenMax.fromTo("#shipAndCable", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0  } });
        TweenMax.fromTo("#monkey", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
        TweenMax.fromTo("#astronaut", 0.6, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });

        TweenMax.fromTo("#monkeyMessage", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
        TweenMax.fromTo("#astronautMessage", 0.6, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }
    //#endregion

    //#region Animate out (when flying higher)
    if (current <= creaturesAnimateOUTPos && creaturesAnimatedIN == true && creaturesAnimatedOUT != true) {
        creaturesAnimatedOUT = true;
        creaturesAnimatedIN = false;
        TweenMax.fromTo("#shipAndCable", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
        TweenMax.fromTo("#monkey", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
        TweenMax.fromTo("#astronaut", 0.6, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });

        TweenMax.fromTo("#monkeyMessage", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
        TweenMax.fromTo("#astronautMessage", 0.6, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }


    if (current > creaturesAnimateOUTPos && creaturesAnimatedIN != true && creaturesAnimatedOUT == true) {
        creaturesAnimatedOUT = false;
        creaturesAnimatedIN = true;
        TweenMax.fromTo("#shipAndCable", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#monkey", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#astronaut", 0.4, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });

        TweenMax.fromTo("#monkeyMessage", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#astronautMessage", 0.4, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }
    //#endregion
    //#endregion
    
    //#region moon surface Part
    //#region Animate moon in (when flying high enough)
    if (current <= moonAnimateINPos && moonAnimationIN != true && moonAnimationOUT == false) {
        moonAnimationIN = true;
        TweenMax.fromTo("#shuttleWrapper", 1, { css: { bottom: (windowheight * 0.50) - shuttleHeight } }, { css: { bottom: earthHeight } });
        TweenMax.fromTo("#moonSurface", 1, { css: { bottom: (-windowheight) / 2 } }, { css: { bottom: -20 } });
        TweenMax.fromTo("#shuttleFire", 1, { css: { bottom: (windowheight * 0.50) - shuttleHeight - 10 } }, { css: { bottom: earthHeight - 10 } });

        TweenMax.fromTo("#moonMessage", 1, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }


    if (current > moonAnimateINPos && moonAnimationIN == true) {
        moonAnimationIN = false;
        TweenMax.fromTo("#moonSurface", 1, { css: { bottom: -20 } }, { css: { bottom: (-windowheight) / 2 } });
        TweenMax.fromTo("#shuttleWrapper", 1, { css: { bottom: earthHeight } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight } });
        TweenMax.fromTo("#shuttleFire", 1, { css: { bottom: earthHeight - 10 } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight - 10 } });

        TweenMax.fromTo("#moonMessage", 1, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }
    //#endregion

    //#region Animate moon out (when flying higher)
    if (current <= moonAnimateOUTPos && moonAnimationIN == true && moonAnimationOUT != true) {
        moonAnimationOUT = true;
        moonAnimationIN = false;
        TweenMax.fromTo("#shuttleWrapper", 1, { css: { bottom: earthHeight } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight } });
        TweenMax.fromTo("#shuttleFire", 1, { css: { bottom: earthHeight - 10 } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight - 10 } });
        TweenMax.fromTo("#moonSurface", 1, { css: { bottom: -20 } }, { css: { bottom: (-windowheight) / 2 } });

        TweenMax.fromTo("#moonMessage", 1, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }


    if (current > moonAnimateOUTPos && moonAnimationIN != true && moonAnimationOUT == true) {
        moonAnimationOUT = false;
        moonAnimationIN = true;
        TweenMax.fromTo("#moonSurface", 1, { css: { bottom: (-windowheight) / 2 } }, { css: { bottom: -20 } });
        TweenMax.fromTo("#shuttleWrapper", 1, { css: { bottom: (windowheight * 0.50) - shuttleHeight } }, { css: { bottom: earthHeight } });
        TweenMax.fromTo("#shuttleFire", 1, { css: { bottom: earthHeight - 10 } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight - 10 } });

        TweenMax.fromTo("#moonMessage", 1, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }
    //#endregion
    //#endregion

    //#region Mars Animation
    if (current <= marsAnimateINOUTPos && marsAnimation != true) {
        marsAnimation = true;
        TweenMax.fromTo("#marsSurface", 0.7, { css: { top: -windowheight / 2 } }, { css: { top: 0 } });

        TweenMax.fromTo("#marsMessage", 1, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }

    if (current > marsAnimateINOUTPos && marsAnimation == true) {
        marsAnimation = false;
        //alert('show earth');
        TweenMax.fromTo("#marsSurface", 1.5, { css: { top: 0 } }, { css: { top: -windowheight / 2 } });

        TweenMax.fromTo("#marsMessage", 1, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }
    //#endregion
}

//#endregion

