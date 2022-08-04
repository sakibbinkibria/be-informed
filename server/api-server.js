const axios = require("axios");
const express = require("express");

const PORT = process.env.PORT || 3001;
const API_KEY = "0c89e38471994a3290fe6969e68cb729";

const app = express();

app.get("/api/loadHeadlines", async (req, res) => {
    var pageSize = req.query.pageSize;
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=${pageSize}`);
    if (response.status === 200) {
        res.send(response.data.articles); 
    }
});

app.get("/api/loadArticles", async (req, res) => {
    var pageSize = req.query.pageSize;
    var country = req.query.country;
    var page = req.query.page;
    var category = req.query.category;
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}&category=${category}`);
    if (response.status === 200) {
        res.send(response.data.articles); 
    }
});

app.get("/api/searchArticles", async (req, res) => {
    var query = req.query.query;
    var page = req.query.page;
    const response = await axios.get(`https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=${query}&page=${page}`);
    if (response.status === 200) {
        res.send(response.data.articles); 
    }
});

app.get("/api/filterByCountry", async (req, res) => {
    var country = req.query.country;
    var page = req.query.page;
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=${country}&page=${page}`);
    if (response.status === 200) {
        res.send(response.data.articles); 
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});