import ThumbnailComponent from './news-thumbnail-component';

export default function GridComponent({articles, handleArticleCLick}) {
    return(
        <div className="grid-view">
        {
            articles && articles.length > 0 ?
                articles.map((article)=>{
                    return(
                        <ThumbnailComponent handleArticleCLick={handleArticleCLick} article={article} width={"315px"} height={"210px"} titleClass={"title-sm"} />
                    )
                })
            : <div style={{position:"absolute", top:"30%", left:"50%", transform:"translate(-50%, -50%)", fontSize:"1.5rem"}}>
                Nothing found!
            </div>
        }
        </div>
    )
}