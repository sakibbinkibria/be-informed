import axios from 'axios';

export default class Loader {
    async loadHeadlines(pageSize) {
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=edfe5f851528444bac6177ca93a0bef1&pageSize=${pageSize}`);
        if(res.status===200){
            return res.data.articles;
        }
    }
    async loadArticles(category, pageSize, page, country) {
        country = country ? country : 'us';
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=edfe5f851528444bac6177ca93a0bef1&pageSize=${pageSize}&page=${page}&category=${category}`);
        if(res.status===200){
            return res.data.articles;
        }
    }

    async searchArticles(query, page) {
        const res = await axios.get(`https://newsapi.org/v2/everything?apiKey=edfe5f851528444bac6177ca93a0bef1&q=${query}&page=${page}`);
        if(res.status===200){
            return res.data.articles;
        }
    }

    async filterByCountry(country, page) {
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?apiKey=edfe5f851528444bac6177ca93a0bef1&country=${country}&page=${page}`);
        if(res.status===200){
            return res.data.articles;
        }
    }
}