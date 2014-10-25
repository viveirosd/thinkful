var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
    var processRequest = function (verb) {
	var pathname = url.parse(req.url).pathname,
            reqUrlArray = pathname.split('/'),
	    i = reqUrlArray[1],
            updateVal = reqUrlArray[2];
      
	if (isNaN(i)) {
	    res.statusCode = 400;
   	    res.end('Item id not valid');
	} else if (!items[i]) {
	    res.statusCode = 404;
	    res.end('Item not found');
	} else if (verb === 'PUT' && reqUrlArray.length != 3) {
	    res.statusCode = 400;
	    res.end('Updated value required');
	} else {
	    var tempItem = items[i];
  	    if (verb === 'DELETE') {
		items.splice(i, 1);
		res.end('Item deleted successfuly: ' + tempItem);
	    } else {
	    	items[i] = updateVal;
		res.end('Item replaced successfully (old,new): ' + tempItem + ',' + items[i]);
	    }
	}
    };
 
    switch (req.method) {
    case 'POST':
        var item = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            item += chunk;
        });
        req.on('end', function () {
            items.push(item);
            res.end('Item added\n');
        });
        break;
    case 'GET':
	items.forEach(function (item, i) {
	    res.write(i + '. ' + item + '\n');
        });
 	res.end();
	break;
    case 'DELETE':
    case 'PUT':
	processRequest(req.method);
	break;
    }
});

server.listen(9000, function(){
   console.log('listening on 9000');
});
