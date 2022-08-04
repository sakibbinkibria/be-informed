import axios from 'axios';
const API_KEY = "0c89e38471994a3290fe6969e68cb729";

export default class Loader {
    async loadHeadlines(pageSize) {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=${pageSize}`);
        if (response.status === 200) {
            return response.data.articles; 
        }
    }
    async loadArticles(category, pageSize, page, country) {
        country = country ? country : 'us';
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}&category=${category}`);
        if (response.status === 200) {
            return response.data.articles; 
        }
    }

    async searchArticles(query, page) {
        const response = await axios.get(`https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=${query}&page=${page}`);
        if (response.status === 200) {
            return response.data.articles; 
        }
    }

    async filterByCountry(country, page) {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=${country}&page=${page}`);
        if (response.status === 200) {
            return response.data.articles; 
        }
    }

    //with backend

    // async loadHeadlines(pageSize) {
    //     const res = await axios.get(`/api/loadHeadlines?pageSize=${pageSize}`);
    //     if(res.status===200){
    //         return res.data;
    //     }
    // }
    // async loadArticles(category, pageSize, page, country) {
    //     country = country ? country : 'us';
    //     const res = await axios.get(`/api/loadArticles?country=${country}&pageSize=${pageSize}&page=${page}&category=${category}`);
    //     if(res.status===200){
    //         return res.data;
    //     }
    // }

    // async searchArticles(query, page) {
    //     const res = await axios.get(`/api/searchArticles?q=${query}&page=${page}`);
    //     if(res.status===200){
    //         return res.data;
    //     }
    // }

    // async filterByCountry(country, page) {
    //     const res = await axios.get(`/api/filterByCountry?country=${country}&page=${page}`);
    //     if(res.status===200){
    //         return res.data;
    //     }
    // }
}