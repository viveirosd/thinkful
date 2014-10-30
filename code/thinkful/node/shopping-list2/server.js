var http = require('http');
var url = require('url');
var qs = require('querystring');

var items = [];

var server = http.createServer(function (req, res) {
    var processPostRequest = function (reqParams) {
	switch (reqParams.command) {
	case 'add':
	    items.push(reqParams.item);
	    break;
 	case 'delete':
	    for (var i = 0; i < items.length; i++) {
	   	if(reqParams.item === items[i]) { //if there are multiple items with same name will remove the first one
		     items.splice(i, 1);
		     break;
		}
	    }
   	    break;
	case 'update':
	    for (var i = 0; i < items.length; i++) {
		if(reqParams.oldItem === items[i]) { //if there are multiple items with the same name will update the first one
		     items[i] = reqParams.newItem;
		     break;
		}
	    }
	    break;
	}
    };

    var displayPage = function () {
	var respHtml = '<html><head></head><body>Current Items in Shopping List:<br>';

	if (items.length < 1) {
	    respHtml += '<br>NO ITEMS IN THE LIST';
	} else {
            respHtml += '<br>';
	    for (var i = 0; i < items.length; i++) {
		respHtml += items[i] + '<br>';
	    }
	}

  	respHtml += '<br><br><br><br>Add an item to the shopping list:<br>' +
		'<form id=\"1\" action=\"/\" method=\"post\">Item:  <input type=\"text\" name=\"item\">' +
		'<input type=\"hidden\" name=\"command\" value=\"add\"><br><button>Add</button></form>';

	respHtml += '<br><br><br><br>Update one item in the shopping list:<br>' +
		'<form id\"2\" action=\"/\" method=\"post">Item to Update:  <input type=\"text\" name=\"oldItem\"><br>' +
		'New Item:  <input type=\"text\" name=\"newItem\">' +
		'<input type=\"hidden\" name=\"command\" value=\"update\"><br><button>Update</button></form>';

	respHtml += '<br><br><br><br>Delete one item from the shopping list:<br>' +
                '<form id=\"3\" action=\"/\" method=\"post">Item:  <input type=\"text\" name=\"item\">' +
                '<input type=\"hidden\" name=\"command\" value=\"delete\"><br><button>Delete</button</form>';
	
	return respHtml += '</body></html>';
    };
 
    switch (req.method) {
    case 'POST':
        var reqParams = '';
	req.setEncoding('utf8');
        req.on('data', function (chunk) {
  	    reqParams += chunk;
        });
        req.on('end', function () {
            processPostRequest(qs.parse(reqParams));
            res.end(displayPage());
        });
        break;
    case 'GET':
 	res.end(displayPage());
	break;
    }
});

server.listen(9000, function(){
   console.log('listening on 9000');
});
