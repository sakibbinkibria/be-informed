import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export default function ThumbnailComponent({ article, width, height, titleClass, handleArticleCLick }) {
    return (
        <div className="shadowEffect" style={{ height: height, width: width }}>
            <div className="imageBox" style={{ width: "100%", height: "100%" }} onClick={() => { handleArticleCLick(article) }}>
                {
                    !article.urlToImage ?
                        <ImageNotSupportedIcon style={{ width: "100%", height: "100%" }} />
                        : <img src={article.urlToImage } alt="not available" style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "8px" }} />
                }
                
                <div className='gradient' style={{ wordBreak: "break-word" }}>
                    <div className={titleClass}>
                        {article.title}
                    </div>
                    <div className="subtitle">
                        {article.author ? article.author+', ' : ''}{article.source.name}
                    </div>
                </div>
            </div>
        </div>
    )
}