//Create the ScrollMagic Controller (and select general options)
//Create an Animation Object (and select animation options)
//Create a Scene Object (and select scene options)
//Add our Animation Object to the Scene Object
//Add the Scene Object to the ScrollMagic Controller

document.onreadystatechange = function (e) {
    if (document.readyState === 'complete') {
        //dom is ready, window.onload fires later
        //Heights van de site en de scenes
        //Kan eventueel opgeroepen worden bij screen resize om zo dynamisch voor elk scherm te kunnen werken
        //Zelfde als 1600vh (zo kunnen we dynamisch voor elke groote van het scherm via code alles aanpassen)
        var siteHeight = $(window).height() * 16;
        $("#stars").height(siteHeight);

        var marsSceneHeight = siteHeight / 5; //20% van 1600vh (maw 320vh (dus 3,2 keer de schermhoogte)
        $("#scene-mars").height(marsSceneHeight);

        var moonSceneHeight = siteHeight / 5;
        $("#scene-moon").height(moonSceneHeight);

        var spaceSceneHeight = siteHeight / 5;
        $("#scene-space").height(spaceSceneHeight);

        var earthSceneHeight = siteHeight - marsSceneHeight - moonSceneHeight - spaceSceneHeight - 500; //rest
        $("#scene-earth").height(earthSceneHeight);
    }
};

window.onload = function (e) {
    //document.readyState will be complete, it's one of the requirements for the window.onload event to be fired
    //do stuff for when everything is loaded
    scrollController()
};





function scrollController() {
    domElements = {};


    // Init Controller
    var scrollMagicController = new ScrollMagic();

    // Titel Animatie Tweens
    var earthTitleTween = TweenMax.to('#earthTitleAnimation', 1, {
        scale: 5,
        opacity: 1,
        bottom: $(window).height() * 0.70 //mannier om 70vh te vinden via jquery
    });

    var spaceTitleTween = TweenMax.to('#spaceTitleAnimation', 1, {
        scale: 5,
        opacity: 1,
        bottom: $(window).height() * 0.70 //mannier om 70vh te vinden via jquery
    });
    var moonTitleTween = TweenMax.to('#moonTitleAnimation', 1, {
        scale: 5,
        opacity: 1,
        bottom: $(window).height() * 0.70 //mannier om 70vh te vinden via jquery
    });
    var marsTitleTween = TweenMax.to('#marsTitleAnimation', 1, {
        scale: 5,
        opacity: 1,
        bottom: $(window).height() * 0.70 //mannier om 70vh te vinden via jquery
    });
    var marsTitleTweenForward = TweenMax.to('#marsTitleAnimation', 1, {
        scale: 1,
        opacity: 0,
        bottom: $(window).height() * 0.70 //mannier om 70vh te vinden via jquery
    });


    // Earth Titel scene
    var sceneEarthTitle = new ScrollScene({
        triggerElement: '#earthTitleAnimation',
        triggerHook: 1,
        offset: $(window).height() * 0.20,
        duration: $(window).height() * 0.50
    })
    .setTween(earthTitleTween)
    .addTo(scrollMagicController);
    sceneEarthTitle.reverse(true);
    sceneEarthTitle.addIndicators();

    // Space Titel scene
    var sceneSpaceTitle = new ScrollScene({
        triggerElement: '#spaceTitleAnimation',
        triggerHook: 1,
        offset: $(window).height() * 0.20,
        duration: $(window).height() * 0.50
    })
    .setTween(spaceTitleTween)
    .addTo(scrollMagicController);
    sceneSpaceTitle.reverse(true);
    sceneSpaceTitle.addIndicators();

    // Moon Titel scene
    var sceneMoonTitle = new ScrollScene({
        triggerElement: '#moonTitleAnimation',
        triggerHook: 1,
        offset: $(window).height() * 0.20,
        duration: $(window).height() * 0.50
    })
    .setTween(moonTitleTween)
    .addTo(scrollMagicController);
    sceneMoonTitle.reverse(true);
    sceneMoonTitle.addIndicators();

    // Mars Titel scene
    var sceneMarsTitle = new ScrollScene({
        triggerElement: '#marsTitleAnimation',
        triggerHook: 1,
        offset: $(window).height() * 0.20,
        duration: $(window).height() * 2
    })
    .setTween(marsTitleTween)
    .addTo(scrollMagicController);

    sceneMarsTitle.reverse(true);
    sceneMarsTitle.addIndicators();

}
