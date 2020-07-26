var express = require('express')
var app = express()

app.use(express.static('./dist/prgDemo'));
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/prgDemo/' }
    );
});
app.listen(process.env.PORT || 8080);
