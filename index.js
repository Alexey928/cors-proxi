const express = require('express');
const axios = require('axios');
const app = express();
const PORT =  3001;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/:url', async (req, res) => {
    console.log(req.params)
    const targetUrl = decodeURIComponent(req.params.url);
    console.log(targetUrl)
    console.log("ww")

    try {
        const response = await axios.get(targetUrl);
        res.json(response.data);

    } catch (error) {
        console.log(error.message);
        console.log('is erro from cath');
        res.status(500).json({ error: error.message});
    }
});


//  Обработка корневого URL
// app.get('/', (req, res) => {
//     res.send("vercel server is started ");
// });


app.listen(PORT, () => {
    console.log(`CORS proxy is running on port ${PORT}`);
});
