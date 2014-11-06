var express = require('express'),
    port = 9000;

var app = express();
var expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.get('/:name/:test', function(req, res){
   res.render('greeting', { title: 'Simple Greeting App', name: req.params.name
      , test: req.params.test});
});

app.get('/:name', function(req, res){
   res.render('greeting', { title: 'Simple Greeting App', name: req.params.name
      });
});

app.listen(port, function(){
   console.log('listening on port ' + port);
});
