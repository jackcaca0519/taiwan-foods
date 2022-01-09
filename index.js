if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');
const mongoDBstore = require('connect-mongo');

const expressError = require('./utilities/expressError');
const User = require('./model/user');

const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');


const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// 設定成可讀body
app.use(express.urlencoded({ extended: true }));
// 設定成可以接收patch的表單
app.use(methodOverride('_method'));
//使用jsDoc裡的檔案
app.use(express.static(path.join(__dirname, "jsDoc")));
//使用stylesheets裡的檔案
app.use(express.static(path.join(__dirname, "stylesheets")));

const store = mongoDBstore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
})

const sessionConfig = {
    store,
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.success = req.flash('success');
    res.locals.fail = req.flash('fail');
    res.locals.error = req.flash('error');
    next();
})

//Routers
app.use('/restaurants', restaurantRoutes);
app.use('/restaurants/:id/reviews', reviewRoutes);
app.use('/', userRoutes);

// Homepage
app.get('/', (req, res) => {
    res.render('home');
})
//找不到網址的錯誤訊息
app.all('*', (req, res, next) => {
    next(new expressError('找不到頁面！', 404));
})
//輸出錯誤訊息
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Server Crash!';
    res.status(status);
    res.render('error', { err });
})

// 開啟伺服器
app.listen(process.env.PORT, () => {
    console.log(`Server open on port ${process.env.PORT}`);
})