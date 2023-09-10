// viewController.js
const viewController = {
  showLogin(req, res) {
    res.render("login");
  },
  showLogout(req, res) {
    res.render("logout");
  },

  showRegister(req, res) {
    res.render("register");
  },

  showProfile(req, res) {
    if (req.session.user) {
      const { first_name, last_name, email, age } = req.session.user;
      res.render("profile", { first_name, last_name, email, age });
    } else {
      res.redirect("/");
    }
  },
};

export default viewController;
