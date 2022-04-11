import './ResultSingle.css';

import useSearchSingle from "../../Custom Hooks/useSearchSingle";
import { useState } from 'react';


function ResultSingle(props){
    
    const item = useSearchSingle(props.id)

    const [watchList, setWatchList] = useState([]);

    function watchListAdd(){
        setWatchList(prev => (
            [...prev, item.imdbID]
        ))
    }

    function watchListRemove(){
        setWatchList(prev => (
            prev.filter(ele => (
                ele != item.imdbID
            ))
        ))
    }

   

    return(
        <div className="result-single">
            {item? 
            <>
                <div className="movie-hero">
                    <img className="poster" src={item.Poster} alt="" />
                    <div className="hero-text">
                        {!watchList.includes(item.imdbID)?
                        <div onClick={watchListAdd} className="watchlist-btn"><i className="fa-regular fa-bookmark" style={{marginRight : "0.5em"}}></i>Watchlist</div>
                        :
                        <div style={{background : "#fc6739"}} onClick={watchListRemove} className="watchlist-btn"><i className="fa-regular fa-bookmark" style={{marginRight : "0.5em"}}></i>Remove from watchlist</div>}

                        

                        <div className="information">
                            <div className="title">{item.Title}</div>
                            <div className="additional-info">
                                <div className="rated">{item.Rated}</div>
                                <div className="year">{item.Year}</div>
                                <div className="tags">{item.Genre}</div>
                                <div className="time">{item.Runtime}</div>
                            </div>
                            <div className="actors">{item.Actors}</div>
                        </div>
                        
                    </div>
                </div>

                <div className="synopsis">{item.Plot}</div>

                <div className="ratings">
                    {item.Ratings.map((rating,index)=>{
                        return(
                            <div key={index} className="rating-block">
                                <div className="rating">{rating.Value}</div>
                                <div className="rating-name">{rating.Source}</div>
                            </div>
                        )
                    })}
                    
                </div>
            </>
            : ""}

            
        </div>
    )

}

export default ResultSingle