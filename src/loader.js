import axios from 'axios';

export default class Loader {
    async loadHeadlines(pageSize) {
        const res = await axios.get(`/api/loadHeadlines?pageSize=${pageSize}`);
        if(res.status===200){
            return res.data;
        }
    }
    async loadArticles(category, pageSize, page, country) {
        country = country ? country : 'us';
        const res = await axios.get(`/api/loadArticles?country=${country}&pageSize=${pageSize}&page=${page}&category=${category}`);
        if(res.status===200){
            return res.data;
        }
    }

    async searchArticles(query, page) {
        const res = await axios.get(`/api/searchArticles?q=${query}&page=${page}`);
        if(res.status===200){
            return res.data;
        }
    }

    async filterByCountry(country, page) {
        const res = await axios.get(`/api/filterByCountry?country=${country}&page=${page}`);
        if(res.status===200){
            return res.data;
        }
    }
}