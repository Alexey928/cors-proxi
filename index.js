const express = require('express');
const axios = require('axios');
const app = express();
const PORT =  3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/proxy/:url', async (req, res) => {
    console.log(req.params)
    const targetUrl = decodeURIComponent(req.params.url);

    try {
        const response = await axios.get(targetUrl);
        res.json(response.data);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message});
    }
});
// Обработка корневого URL
app.get('/', (req, res) => {
    res.send('Привет');
});


app.listen(PORT, () => {
    console.log(`CORS proxy is running on port ${PORT}`);
});