function log (req,res,next) {
    console.log("log");
    next();
}

function auth (req,res,next) {
    console.log("auth");
    next();
}

module.exports = {
    log,
    auth,
}