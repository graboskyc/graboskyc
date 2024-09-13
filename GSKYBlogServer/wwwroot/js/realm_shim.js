const client = stitch.Stitch.initializeDefaultAppClient("ig-epove");

window.BlazorScrollToId = function(id) {
    console.log("scrolling to " + id);
    const element = document.getElementById(id);
    if (element instanceof HTMLElement) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }
}

var globalGlobe = null;

window.buildGlobe = async function(datapoints) {
    console.log(datapoints);

    var container = document.getElementById( 'ctr_globe' );

    // Make the globe
    globalGlobe = new DAT.Globe( container , {imgDir: "/assets/"});

    //var datapoints = await realmShim_Function("getFlights", []);
    var min = 999999999;
    var max = 0;

    var PHL = {};

    // normalize
    datapoints.forEach((element) => {
        // ignore philly my home airport
        if(element["code"] != "PHL") {
            if(element["count"]> max) {
                max = element["count"];
            }
            if(element["count"]< min) {
                min = element["count"];
            }
        } else {
            PHL = element;
        }
    });

    var series = [];

    datapoints.forEach((element) => {
        // ignore philly my home airport
        if(element["code"] != "PHL") {
            series.push(element["lat"]);
            series.push(element["lon"]);
            series.push(((element["count"] - min) / (max - min)));
        }
    });

    // now add back in philly but just make line max non-philly
    series.push(PHL["lat"]);
    series.push(PHL["lon"]);
    series.push(1);

    //var graphable = ["Flights", series];

    globalGlobe.addData(series, {format: 'magnitude', name: "Flights"} );

    globalGlobe.createPoints();

    // Begin animation
    globalGlobe.animate();
    setTimeout(function(){rot ();}, 2000);
}

function rot() {
    globalGlobe.grabTurn(-5);
    setTimeout(function(){rot();}, 100);
}