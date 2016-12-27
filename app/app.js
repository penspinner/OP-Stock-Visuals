var express = require('express');
var yql = require('yql');

let app = express();

app.set('port', process.env.port || 4000);
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.post('/quote', (req, res) =>
{
    console.log(req.query);
    var url = "";
    for (var param in req.query)
    {
        if (param === 'url')
            url += param + '=' + "'" +req.query[param] + '&';
        else
            url += param + '=' + req.query[param] + '&';
    }
    url += "'";
    console.log(url);
    var query = new yql("select * from csv where " + url + "");
    query.exec((err, data) => 
    {
        if (err) throw err;
        console.log(data);
        res.json(data);
    });
});

app.listen(app.get('port'), () => 
{
    console.log('Listening on port: ' + app.get('port'));
});