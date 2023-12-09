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
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * 5. 設置路由
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);



/**
 * 6. 設置 error handler
 */

module.exports = app;
