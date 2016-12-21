var express = require('express');
var cors = require('cors');

let app = express();
app.use(cors({credentials: true, origin: true}));
app.set('port', process.env.port || 4000);
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(app.get('port'), () => 
{
    console.log('Listening on port: ' + app.get('port'));
});