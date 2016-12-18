var express = require('express');

let app = express();

app.set('port', process.env.port || 4000);
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(app.get('port'), () => 
{
    console.log('Listening on port: ' + app.get('port'));
});