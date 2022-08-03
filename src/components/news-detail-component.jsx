import { useEffect, useState } from "react";
import { Modal,Typography } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export default function NewsDetail({open, handleModalClose, news}) {
    const [dateString, setDateString] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const d = new Date(news.publishedAt);
        setDateString(d.toDateString());
        if(!news.urlToImage){
            setError(true);
        }
    }, []);

    const handleError = () => {
        setError(true)
    }
    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
        >
            <div className="blurred-bg">
                <Typography style={{fontFamily:"LT Museum", fontSize:"1.7rem"}}>{news.title}</Typography>
                <div style={{display:"flex", fontStyle:"italic"}}>
                    {
                        news.author &&
                        <Typography style={{marginRight:"10px"}} variant="body2">{news.author},</Typography>
                    }
                    <Typography variant="body2">Published at: {dateString}</Typography>
                </div>
                {
                    error ?
                        <ImageNotSupportedIcon style={{width:"30vw", height:"20vw", margin:"15px auto"}}/>
                    : <img style={{width:"39vw", height:"26vw", objectFit:"cover", margin:"15px auto"}} className="shadowEffect" src = {news.urlToImage} alt="missing" onerror={handleError}/>
                }
                <Typography variant="body1"> {news.description}  <a href={news.url} target="_blank">read more</a></Typography>
            </div>
        </Modal>
    )
}