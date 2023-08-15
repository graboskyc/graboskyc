const client = stitch.Stitch.initializeDefaultAppClient("ig-epove");

window.login = async function(){
    try {
        if (!client.auth.isLoggedIn) {
            const credential = new stitch.AnonymousCredential();
            var authedUser = await client.auth.loginWithCredential(credential);
            if(authedUser) {
                console.log(`successfully logged in with id: ${authedUser.id}`);
                return true;
            }
            else {
                console.log(`login failed`);
                return false;
            }
        } else {
            console.log(client.auth.currentUser);
            return true;
        }
        
    }
    catch(e) {
        return false;
    }
}

window.realmShim_Function = async function(fnname, args) {
    console.log(fnname);
    console.log(args);
    var result = await client.callFunction(fnname,args);
    console.log(result);
    return result;
}

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

window.PrismColorCode = async function() {
    Prism.highlightAll();
}

var globalGlobe = null;

window.buildGlobe = async function() {
    await login();

    var container = document.getElementById( 'ctr_globe' );

    // Make the globe
    globalGlobe = new DAT.Globe( container , {imgDir: "/assets/"});

    var datapoints = await realmShim_Function("getFlights", []);

    var series = [];

    datapoints.forEach((element) => {
        series.push(element["Lat"]);
        series.push(element["Lon"]);
        series.push(element["Count"]);
    });

    //var graphable = ["Flights", series];

    globalGlobe.addData(series, {format: 'magnitude', name: "Flights"} );

    globalGlobe.createPoints();

    // Begin animation
    globalGlobe.animate();
    setTimeout(function(){rot ();}, 2000);
}

function rot() {
    globalGlobe.grabTurn(5);
    setTimeout(function(){rot();}, 100);
}