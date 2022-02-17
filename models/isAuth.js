module.exports = (req, res, next) => {
    if (req.session.isAuth == true) {
        next();
    } else {
        console.log("Please, login!");
        res.redirect("/login");
    }
  };