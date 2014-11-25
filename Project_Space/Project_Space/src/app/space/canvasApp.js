
var scrollValue = 0;

window.addEventListener("scroll", parallax, false);

function parallax() {
    scrollValue = 1;

    var background = document.getElementById("Background");
    background.style.bottom = scrollValue + 'px';
}

////self invoking function to start automaticly and use as object
//(function () {
//    var canvas = document.getElementById('mainCanvas'),
//        context = canvas.getContext('2d');

//    // resize the canvas to fill browser window dynamically
//    window.addEventListener('resize', resizeCanvas, false);
//    //zal dankzij eventlistener telkens worden opgeroepen wanneer er geresized wordt
//    function resizeCanvas() {
//        canvas.width = window.innerWidth;
//        canvas.height = window.innerHeight;

//        /**
//         * Your drawings need to be inside this function otherwise they will be reset when 
//         * you resize the browser window and the canvas goes will be cleared.
//         */
//        drawScreen();
//    }
//    resizeCanvas();

//    //wordt aangeroepen in resizeCanvas.
//    function drawScreen() {
//        context.fillStyle = "#ffffaa";
//        context.fillRect(0, 0, 600, 300);

//        context.fillStyle = "#000000";
//        context.font = "20px Sans-Serif";
//        context.textBaseline = "top";
//        context.fillText("Hello World!", 195, 80);
//    }

//})();

////Test om te kijken of HTML page al geladen is om dan canvas te starten
//window.addEventListener("load", eventWindowLoaded, false);
//function eventWindowLoaded() {
//    canvasApp();
//};
////oftewel window.onload = function(){canvasApp();}
//// oftewel nog korter: window.onload = canvasApp;
////oftewel in een self invoking function steken

//function canvasApp() {
    
//    var canvasScreen = document.getElementById("mainCanvas");
//    // kijken of canvas bestaat
//    if (!canvasSupport) { return; }

//    // use 2D context of canvas
//    var context = canvasScreen.getContext("2d");

//    // resize the canvas to fill browser window dynamically
//    window.addEventListener('resize', resizeCanvas, false);
//    resizeCanvas();
    
//};

//function drawScreen() {

//    context.fillStyle = "#ffffaa";
//    context.fillRect(0, 0, 500, 300);

//};

//function resizeCanvas() {
//    canvasScreen.width = window.innerWidth;
//    canvasScreen.height = window.innerHeight;

//    /**
//     * Your drawings need to be inside this function otherwise they will be reset when 
//     * you resize the browser window and the canvas goes will be cleared.
//     */
//    drawScreen();
//}

//function canvasSupport() {
//    return Modernizr.canvas;
//}

