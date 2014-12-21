//globale variablen
var startScroll;
var currentScrollTop;
var lastScrollTop = 150000;
var scrollValue = 15000;
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

//Animation trigger variabelen
var earthAnimation;
var shuttleBeforeTakeOff;
var shuttleTakeOff;
var atmospherOpacity;


$(document).ready ( function(){
    //startScroll = window.scrollY;
});


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
    //initialize jRumble on selectors die rumble nodig hebben
    //moeten shuttle in wrapper steken anders werkt het niet omdat die absoluut gepositioneerd staat
    
}

function CheckAnimations() {
    current = window.scrollY + windowheight;

    $('#shipShaker').jrumble({
        speed:0
    });
    
    //#region Earth Animation
    if (current <= 13500 && earthAnimation != true) {
        earthAnimation = true;
        //alert('hide earth');
        TweenMax.fromTo("#earth", 1, { css: { bottom: 0 } }, { css: { bottom: -(earthHeight) } });
    }

    if (current > 13500 && earthAnimation == true) {
        earthAnimation = false;
        //alert('show earth');
        TweenMax.fromTo("#earth", 1, { css: { bottom: -(earthHeight) } }, { css: { bottom: 0 } });
    }
    //#endregion

    //#region Shuttle BeforeTakeOff Animation
    if (current <= 14900 && shuttleBeforeTakeOff != true) {
        shuttleBeforeTakeOff = true;
        //alert('start takeoff shake');
        $('#shipShaker').trigger('startRumble');
    }

    if (current > 14900 && shuttleBeforeTakeOff == true) {
        shuttleBeforeTakeOff = false;
        //alert('stop takeoff shake');
        $('#shipShaker').trigger('stopRumble');
    }
    //#endregion

    //#region Shuttle TakeOff Animation
    if (current <= 13500 && shuttleTakeOff != true) {
        shuttleTakeOff = true;
        //alert('shuttle takes off');
        TweenMax.fromTo("#shuttleWrapper", 2, { css: { bottom: earthHeight } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight } });
        $('#shipShaker').trigger('stopRumble');
    }

    if (current > 13500 && shuttleTakeOff == true) {
        shuttleTakeOff = false;
        //alert('shuttle is about to land');
        TweenMax.fromTo("#shuttleWrapper", 2, { css: { bottom: (windowheight * 0.50) - shuttleHeight } }, { css: { bottom: earthHeight } });
    }
    //#endregion

    //#region SpaceShip Sideways for ISS
    if (current <= 12600 && issAnimatedIN != true) {
        
    }


    if (current > 12600 && atmospherOpacity == true) {
        atmospherOpacity = false;

        //higherAtmosphereOpacity();
    }
    //#endregion

    
}

