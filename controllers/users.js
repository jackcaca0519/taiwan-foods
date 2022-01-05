const User = require('../model/user');



module.exports.registerPage = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const user = new User(req.body.user);
        const newUser = await User.register(user, req.body.password);
        req.login(newUser, err => {
            if (err) return next(err);
            req.flash('success', '歡迎光臨此網站');
            res.redirect('/restaurants');
        });
    } catch (e) {
        req.flash('fail', e.message)
        res.redirect('/register')
    }
}

module.exports.loginPage = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', '歡迎回來！');
    const Url = req.session.returnTo || '/restaurants';
    delete req.session.returnTo;
    res.redirect(Url);
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', '成功登出！');
    res.redirect('/restaurants');
}