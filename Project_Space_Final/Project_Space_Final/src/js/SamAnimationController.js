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
var issAnimatedIN;
var issAnimatedOUT = false;
var sputnikAnimatedIN;
var sputnikAnimatedOUT = false;
var creaturesAnimatedIN;
var creaturesAnimatedOUT = false;
var moonAnimationIN;
var moonAnimationOUT = false;
var marsAnimation;



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

    //#region ISS Part
    //#region Animate ISS in (when flying high enough)
    if (current <= 12300 && issAnimatedIN != true && issAnimatedOUT == false) {
        issAnimatedIN = true;
        //alert("eerste animatie");
        TweenMax.fromTo("#spaceStation", 1.5, { css: { top: -windowheight / 2 } }, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } });
    }


    if (current > 12300 && issAnimatedIN == true) {
        issAnimatedIN = false;
        TweenMax.fromTo("#spaceStation", 1.5, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } }, { css: { top: -windowheight / 2 } });
        //higherAtmosphereOpacity();
    }
    //#endregion

    //#region Animate ISS out (when flying higher)
    if (current <= 11000 && issAnimatedIN == true && issAnimatedOUT != true) {
        issAnimatedOUT = true;
        issAnimatedIN = false;
        //alert("zou moeten uit animeren naar onder");
        TweenMax.fromTo("#spaceStation", 1.5, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } }, { css: { top: 3 * (windowheight / 2) } });
    }


    if (current > 11000 && issAnimatedIN != true && issAnimatedOUT == true) {
        issAnimatedOUT = false;
        issAnimatedIN = true;
        //alert("zou moeten in animeren van onder");
        TweenMax.fromTo("#spaceStation", 1.5, { css: { top: 3 * (windowheight / 2) } }, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } });
        //higherAtmosphereOpacity();
    }
    //#endregion
    //#endregion
   
    //#region sputnik Part
    //#region Animate sputnik in (when flying high enough)
    if (current <= 10500 && sputnikAnimatedIN != true && sputnikAnimatedOUT == false) {
        //alert("ik kom in sputnik animatie terecht")
        sputnikAnimatedIN = true;
        //alert("eerste animatie");
        TweenMax.fromTo("#sputnik", 1.5, { css: { top: -windowheight / 2 } }, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } });
    }


    if (current > 10500 && sputnikAnimatedIN == true) {
        sputnikAnimatedIN = false;
        TweenMax.fromTo("#sputnik", 1.5, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } }, { css: { top: -windowheight / 2 } });
        //higherAtmosphereOpacity();
    }
    //#endregion

    //#region Animate sputnik out (when flying higher)
    if (current <= 9200 && sputnikAnimatedIN == true && sputnikAnimatedOUT != true) {
        sputnikAnimatedOUT = true;
        sputnikAnimatedIN = false;
        //alert("zou moeten uit animeren naar onder");
        TweenMax.fromTo("#sputnik", 1.5, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } }, { css: { top: 3 * (windowheight / 2) } });
    }


    if (current > 9200 && sputnikAnimatedIN != true && sputnikAnimatedOUT == true) {
        sputnikAnimatedOUT = false;
        sputnikAnimatedIN = true;
        //alert("zou moeten in animeren van onder");
        TweenMax.fromTo("#sputnik", 1.5, { css: { top: 3 * (windowheight / 2) } }, { css: { top: (windowheight / 2) - (shuttleHeight / 2) } });
        //higherAtmosphereOpacity();
    }
    //#endregion
    //#endregion

    //#region Living creatures in space
    //#region Animate in (when flying high enough)
    if (current <= 8700 && creaturesAnimatedIN != true && creaturesAnimatedOUT == false) {
        //alert("ik kom in de animeer in functie")
        creaturesAnimatedIN = true;
        TweenMax.fromTo("#shipAndCable", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#monkey", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#astronaut", 0.4, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }


    if (current > 8700 && creaturesAnimatedIN == true) {
        creaturesAnimatedIN = false;
        TweenMax.fromTo("#shipAndCable", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0  } });
        TweenMax.fromTo("#monkey", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
        TweenMax.fromTo("#astronaut", 0.6, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }
    //#endregion

    //#region Animate out (when flying higher)
    if (current <= 7400 && creaturesAnimatedIN == true && creaturesAnimatedOUT != true) {
        creaturesAnimatedOUT = true;
        creaturesAnimatedIN = false;
        TweenMax.fromTo("#shipAndCable", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
        TweenMax.fromTo("#monkey", 0.5, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
        TweenMax.fromTo("#astronaut", 0.6, { css: { scale: 1, opacity: 1 } }, { css: { scale: 0, opacity: 0 } });
    }


    if (current > 7400 && creaturesAnimatedIN != true && creaturesAnimatedOUT == true) {
        creaturesAnimatedOUT = false;
        creaturesAnimatedIN = true;
        TweenMax.fromTo("#shipAndCable", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#monkey", 0.5, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
        TweenMax.fromTo("#astronaut", 0.4, { css: { scale: 0, opacity: 0 } }, { css: { scale: 1, opacity: 1 } });
    }
    //#endregion
    //#endregion
    
    //#region moon surface Part
    //#region Animate moon in (when flying high enough)
    if (current <= 6500 && moonAnimationIN != true && moonAnimationOUT == false) {
        moonAnimationIN = true;
        TweenMax.fromTo("#shuttleWrapper", 1, { css: { bottom: (windowheight * 0.50) - shuttleHeight } }, { css: { bottom: earthHeight } });
        TweenMax.fromTo("#moonSurface", 1, { css: { bottom: -windowheight} }, { css: { bottom: -(windowheight*0.15) } });
    }


    if (current > 6500 && moonAnimationIN == true) {
        moonAnimationIN = false;
        TweenMax.fromTo("#moonSurface", 1, { css: { bottom: -(windowheight * 0.15) } }, { css: { bottom: -windowheight } });
        TweenMax.fromTo("#shuttleWrapper", 1, { css: { bottom: earthHeight } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight } });
    }
    //#endregion

    //#region Animate moon out (when flying higher)
    if (current <= 4500 && moonAnimationIN == true && moonAnimationOUT != true) {
        moonAnimationOUT = true;
        moonAnimationIN = false;
        TweenMax.fromTo("#shuttleWrapper", 1, { css: { bottom: earthHeight } }, { css: { bottom: (windowheight * 0.50) - shuttleHeight } });
        TweenMax.fromTo("#moonSurface", 1, { css: { bottom: -(windowheight * 0.15) } }, { css: { bottom: -(windowheight / 2) } });
    }


    if (current > 4500 && moonAnimationIN != true && moonAnimationOUT == true) {
        moonAnimationOUT = false;
        moonAnimationIN = true;
        TweenMax.fromTo("#moonSurface", 1, { css: { bottom: -(windowheight / 2) } }, { css: { bottom: -(windowheight * 0.15) } });
        TweenMax.fromTo("#shuttleWrapper", 1, { css: { bottom: (windowheight * 0.50) - shuttleHeight } }, { css: { bottom: earthHeight } });
    }
    //#endregion
    //#endregion

    //#region Mars Animation
    if (current <= (windowheight + 500) && marsAnimation != true) {
        marsAnimation = true;
        TweenMax.fromTo("#marsSurface", 1, { css: { top: -windowheight / 2 } }, { css: { top: 0 } });
    }

    if (current > (windowheight + 500) && marsAnimation == true) {
        marsAnimation = false;
        //alert('show earth');
        TweenMax.fromTo("#marsSurface", 1, { css: { top: 0 } }, { css: { top: -windowheight / 2 } });
    }
    //#endregion
}


