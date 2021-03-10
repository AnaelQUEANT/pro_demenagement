const express = require('express');
const app = express();
const path = require('path')
const PORT = 7223;


app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(PORT, () => console.log(`listening on http://127.0.0.1:${PORT} !`));


