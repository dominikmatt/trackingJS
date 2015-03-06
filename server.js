var express = require('express'),
    app = express();


app.use('/', express.static(__dirname + '/example'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/jasmine', express.static(__dirname + '/jasmine'));
app.use('/tests', express.static(__dirname + '/tests'));

app.listen(3000);
