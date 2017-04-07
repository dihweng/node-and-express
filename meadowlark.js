var express = require('express');
var handlebars  = require('express-handlebars');


var app = express();


var fortunes = [
"Conquer your fears or they will conquer you.", "Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.", "Whenever possible, keep it simple.",
];


//set up handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//Route to the HomePage
app.get('/', function(req, res) {
	res.render('home');
});

//Route to about page
app.get('/about', function(req, res) {
	var randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
res.render('about', { fortune: randomFortune });
});
    // custom 404 page catch-all handler (middleware)
app.use(function(req, res, next){ res.type('text/plain');
            res.status(404);
            res.render('404');
});

    // custom 500 page
app.use(function(err, req, res, next){ 
	console.error(err.stack);
            res.status(500);
            res.render('500');
});

//middleware to detect test=1
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
	req.query.test === '1';
	next();
})

//Static middleware
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );

 });