/**
 * App.js 的目的，就是初始化 express 的 app，設置一些基本的設定，例如 view engine、static 資料夾、路由等等。
 * 
 *  */


/**
 * 1. 載入 express 以及 express 所需的相關套件、模組(library , module, framework)
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { log } = require('console');


/**
 * 初始化 handlebars
 */
hbs.registerHelper('matt_say', function (b) {
    if(!b){
        return 'Empty String!';
    }
    
    return `Matt says: ${b}`;
});
const headerHtml = fs.readFileSync('./views/header.hbs', 'utf8');
hbs.registerHelper('header', function(text){
    // hbs.handlebars.escapeExpression 跳脫 HTML tag
    // hbs.handlebars.SafeString 跳脫 handlebars 的 syntax 
    
    return headerHtml;
});
hbs.registerPartial('header', headerHtml);



/**
 * 2. 初始化 express 的 app
 */

var app = express();

/**
 * 3. 設置 view engine
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * 4. 設置 expressjs 的 middleware
 */
app.use(function(req, res, next){
    console.log(`${req.method} ${req.path} ${res.statusCode}`);
    next();
});
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * const static = function(dirPath) {
    return function(req, res, next) {
        const path = req.path;
        const filePath = `${__dirname}/${dirPath}${path}`;
        // 檢查現在這個請求的路徑，是否有對應到 public 資料夾裡面的檔案
        if(fs.existsSync(filePath)) {
            // 如果有，就直接回傳檔案內容
            res.send(fs.readFileSync(filePath, 'utf8'));
            return;
        }

        next();
    }
}
app.use(static('public'));
 */
app.use(express.static(path.join(__dirname, 'public')));


/**
 * 5. 設置路由
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);


/**
 * 6. 設置 error handler
 */
app.use(function(err, req, res, next) {
    console.log('進入 error handler');

    res.status(500).send({
        msg: 'Something went wrong',
        error: err.message,
    });
});

module.exports = app;
