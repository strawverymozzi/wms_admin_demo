var express = require('express')
var app = express()

app.use(express.static('./dist/ngxAdminDemo'));
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/ngxAdminDemo/' }
    );
});
app.listen(process.env.PORT || 8080);
