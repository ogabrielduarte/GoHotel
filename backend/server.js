const express = require('express');
const cors = require('cors');
const app = express();

app.get('/', (req, res) => {
    res.send('hello world')
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log('server rodando na porta', PORT);
})