var express = require('express'),
    app = express(),
    hbs = require('express-hbs');

var oneDay = 86400000;

app.use(express.compress());
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views/partials',
  contentHelperName: 'content',
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(process.env.PORT || 3000);