var express = require('express'),
    app = express();


app.use('/', express.static(__dirname + '/example'));
app.use('/scripts', express.static(__dirname + '/scripts'));

app.listen(3000);
