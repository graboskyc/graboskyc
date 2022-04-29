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

function BlazorScrollToId(id) {
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