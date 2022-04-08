const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/object-detection'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/object-detection/' }),
);

app.listen(process.env.PORT || 8080);