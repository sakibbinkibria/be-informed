import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import AppBarComponent from './components/app-bar';
import MainComponent from './components/main-container';
import GridComponent from './components/grid-component';
import NewsDetail from './components/news-detail-component';
import { CircularProgress } from '@mui/material';
import theme from './theme';
import Loader from "./loader";
import config from './config';

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Button } from "@mui/material";

function App() {
  const [currentCategory, setCurrentCategory] = useState('home');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  // const [moreToLoad, setMoreToLoad] = useState(true);
  const [articles, setArticles] = useState({ headlines: [], general: [], entertainment: [], science: [], business: [], technology: [], sports: []});
  const [searchResults, setSearchResults] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentArticle, setCurrentArticle] = useState();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchQuery, setSearchQuery] = useState();
  const [pageCounts, setPageCounts] = useState({headlines: 1, general: 1, entertainment: 1, science: 1, business: 1, technology: 1, sports: 1, search:1, country:1});

  const loader = new Loader();
  const gridRef = useRef();

  useEffect(() => {
    callApi();
    getHeadlines();
  }, []);

  useEffect(() => {
    if(currentCategory !== 'home' && currentCategory !== 'search'){
      getCategorizedNews(currentCategory);
    }
  }, [currentCategory]);

  async function callApi(){
    const res = await axios.get('/api');
    console.log(res);
  }

  async function getHeadlines() {
    setLoading(true);
    const headlines = await loader.loadHeadlines(4);
    const sports = await loader.loadArticles('sports', 12, 1, null);
    setArticles({ ...articles, sports: sports, headlines: headlines });
    setLoading(false);
  }

  async function getCategorizedNews(category, page, scrolling) {
    if(!scrolling)
      setLoading(true);
    if (articles[category]?.length === 0 || scrolling) {
      if(!page)
        page = pageCounts[category];
      const newArticles = await loader.loadArticles(category, 20, page, null);
      setArticles({ ...articles, [category]: newArticles })
    }
    if(!scrolling)
      setLoading(false);
  }
  
  const search = async (query)=>{
    if(!loadingMore){
      setLoading(true);
    }
      
    const page = pageCounts[currentCategory];
    const newArticles = await loader.searchArticles(query, page);
    setSearchResults(newArticles);
    setCurrentCategory('search');
    if(!loadingMore){
      setLoading(false);
    }

  }

  const filterByCountry = async (country)=>{
    if(!loadingMore)
      setLoading(true);
    const page = pageCounts[currentCategory];
    const newArticles = await loader.filterByCountry(country, page);
    setSearchResults(newArticles);
    setCurrentCategory('country');
    if(!loadingMore)
      setLoading(false);
  }

  const handleModalCLose = () => {
    setOpenDetail(false);
  }

  const handleArticleCLick = (article) => {
    setCurrentArticle(article);
    setOpenDetail(true);
  }

  const onScroll = async () => {
    if (gridRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = gridRef.current;
      if (scrollHeight - scrollTop - clientHeight < 100 && !loadingMore) {
        setLoadingMore(true);
        const currentCount = pageCounts[currentCategory];
        if(currentCategory === 'search'){
            setPageCounts({...pageCounts, search: currentCount+1});
            await search(searchQuery)
        } else if(currentCategory === 'country'){
            setPageCounts({...pageCounts, country: currentCount+1});
            await filterByCountry(selectedCountry);
        } else {
          await getCategorizedNews(currentCategory === 'home' ? 'sports' : currentCategory, currentCount+1, true);
        }
        setLoadingMore(false);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <AppBarComponent 
          setCurrentCategory={setCurrentCategory} 
          search={search} filterByCountry={filterByCountry} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          selectedCountry={selectedCountry} 
          setSelectedCountry={setSelectedCountry} 
        />
        {
          loading ?
            <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: "0px" }} />
            :
            <div ref={gridRef} onScroll={onScroll} style={{overflowY:"auto"}}>
              {
                currentCategory === 'home' ?
                  <MainComponent allArticles={articles} handleArticleCLick={handleArticleCLick} getCategorizedNews={getCategorizedNews}/>
                : currentCategory === 'search' || currentCategory === 'country' ?
                    <GridComponent articles={searchResults} handleArticleCLick={handleArticleCLick} />
                  :
                    articles.general.length > 0 ?
                      <div style={{ height: "calc(100vh - 64px)",  overflowY : "auto" }}>
                        <GridComponent articles={articles[currentCategory]} handleArticleCLick={handleArticleCLick} />
                      </div>
                    : ''
              }
              {
                openDetail ?
                  <NewsDetail open={openDetail} handleModalClose={handleModalCLose} news={currentArticle} />
                  : ''
              }
            </div>
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
