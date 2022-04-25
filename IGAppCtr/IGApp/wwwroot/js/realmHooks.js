const client = stitch.Stitch.initializeDefaultAppClient("ig-epove");

if (client.auth.hasRedirectResult()) {
    client.auth.handleRedirectResult().then(user => {
        console.log(user);
    });
}

var errCt = 0;

window.login = async function(un, pw){
    try {
        if (!client.auth.isLoggedIn) {
            const credential = new stitch.UserPasswordCredential(un, pw);
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

window.goodLogin = function(authedUser) {
    console.log(`successfully logged in with id: ${authedUser.id}`);
    return true;
}

window.loginFail = function(err) {
    console.error(`login failed with error: ${err}`);
    return false;
}

window.getUserDetails = function() {
    var r = {};
    r.email = client.auth.currentUser.profile.email;
    r.id = client.auth.currentUser.id;
    console.log(r);
    return r;
}

window.realmShim_Function = async function(fnname, args) {
    console.log(fnname);
    console.log(args);
    var a = args;
    if(!Array.isArray(a)) {
        a = [args];
    } else if(fnname == "setFirstOrderOBQ") {
        a = [args];
    }
    var result = await client.callFunction(fnname,a);
    console.log(result);
    return result;
}

window.realmShim_SetCustomUserData = function(key, value) {
    client.auth.user.customData[key] = value;
}

window.logout = function() {
    client.auth.isLoggedIn = false;
    client.auth.logout().then(() => {
        window.location = "/";
    });
}

window.registerUser = async function (un, pw) {
    const emailPassClient = client.auth.getProviderClient(stitch.UserPasswordAuthProviderClient.factory);

    var r = "";
    r = await emailPassClient.registerWithEmail(un, pw);
    console.log(r);
    return r;
}

window.resetUser = async function(un) {
    if(un.length > 0 ) {
        const emailPassClient = client.auth.getProviderClient(stitch.UserPasswordAuthProviderClient.factory);

        await emailPassClient.sendResetPasswordEmail(un);
    }
    else {
        alert("Fill out your email address!");
    }
}

window.haxDdlParser = function(id) {
    var selected = [];
    var fld = document.getElementById(id);
    for (var i = 0; i < fld.options.length; i++) {
        if (fld.options[i].selected) {
            selected.push(fld.options[i].value);
        }
    }
    return selected;
}

window.captureEnter = function(btnid) {
    document.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById(btnid).click();
        }
    });
}