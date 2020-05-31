exports.dashboard = (req, res) => {
    console.log(res.locals.currentUser);
    return res.json({
        message:"this is dashboard",
    });
}