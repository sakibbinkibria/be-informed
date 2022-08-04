import '../App.css';
import { useState, useEffect } from 'react';
import ThumbnailComponent from './news-thumbnail-component';
import { Tabs, Tab, CircularProgress } from '@mui/material';

import GridComponent from './grid-component';
import Loader from '../loader';
import config from "../config";

export default function MainComponent({ allArticles, handleArticleCLick, getCategorizedNews }) {
    const loader = new Loader();
    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadedArticles, setLoadedArticles] = useState({...allArticles});
    useEffect(() => {
        setLoadedArticles({...allArticles});
    }, [allArticles])

    const handleTabChange = (e, value)=>{
        const currentCategory = config.categories[value].toLowerCase();
        getCategorizedNews(currentCategory, null, null, setLoading)
        setTabIndex(value);
    }

    // async function getCategorizedNews(value) {
    //     setLoading(true);
    //     const currentCategory = config.categories[value].toLowerCase();
    //     if (loadedArticles[currentCategory]?.length === 0) {
    //       const newArticles = await loader.loadArticles(currentCategory, 20, 1, null);
    //       setLoadedArticles({ ...loadedArticles, [currentCategory]: newArticles });
    //     }
    //     setLoading(false);
    //   }
    

    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "10px", margin: "auto", height: "calc(100vh - 64px)", boxSizing: "border-box", alignItems:"center" }}>
            <div style={{maxWidth: "1440px"}}>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px", width: "100%", height: "60vh", boxSizing: "border-box", justifyContent: "center" }}>
                <ThumbnailComponent handleArticleCLick={handleArticleCLick} article={loadedArticles['headlines'][0]} width={"50vw"} height={"100%"} titleClass={"title"} />

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "calc(50% - 10px)", height: "100%", boxSizing: "border-box" }}>
                    <ThumbnailComponent handleArticleCLick={handleArticleCLick} article={loadedArticles.headlines[1]} width={"100%"} height={"calc(62% - 10px)"} titleClass={"title"} />
                    <div style={{ display: "flex", width: "100%", gap: "10px", boxSizing: "border-box", height: "38%", justifyContent: "space-between" }}>
                        <ThumbnailComponent handleArticleCLick={handleArticleCLick} article={loadedArticles.headlines[2]} width={"calc(50% - 5px)"} height={"100%"} titleClass={"title-sm"} />
                        <ThumbnailComponent handleArticleCLick={handleArticleCLick} article={loadedArticles.headlines[3]} width={"calc(50% - 5px)"} height={"100%"} titleClass={"title-sm"} />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs value={tabIndex} onChange={handleTabChange} style={{ marginTop: "10px"}} variant="scrollable" scrollButtons="auto">
                {
                    config.categories.map((category) => {
                        return <Tab label={category}/>
                    })
                }
            </Tabs>
            {
                <div style={{display:"flex", justifyContent:"center"}}>
                    {
                        loading ?
                            <CircularProgress style={{ alignSelf:"center", margin:"30px auto", border: "40px"}} />
                        :
                        loadedArticles[config.categories[tabIndex].toLowerCase()].length > 0 ? 
                            <GridComponent articles={loadedArticles[config.categories[tabIndex].toLowerCase()]} handleArticleCLick={handleArticleCLick} />
                        : ''
                    }
                </div>
            }
        </div>
        </div>
    );
}
