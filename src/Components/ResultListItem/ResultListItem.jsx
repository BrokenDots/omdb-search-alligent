import { useCallback, useEffect, useRef, useState } from "react";

//import css
import './ResultListItem.css';

//import custom stuff
import useSearch from "../../Custom Hooks/useSearch";


export default function ResultListItem(props){

    //we pass the requested query and the function which renders the more info div as props from the parent
    const requestedData = props.data;
    const onClickFunction = props.func

    //using page as a state so that whenever page updates, the component would be rerendered
    const [page, setPage] = useState(1);

    //we get the data from the custom hook which returns us the result of the api 
    const {results, resultCount, hasMore} = useSearch(requestedData.query, requestedData.type, requestedData.yearLowerLimit, requestedData.yearUpperLimit, page)

    //to avoid losing the value of the observer with each rerun we use ref
    const observer = useRef() 

    //in the jsx, we have added a condition that would add a ref to the last element
    //when the last element is rendered, the callback would be executed which creates the interaction observer and updates page
    const lastItem = useCallback(node => {
        if (observer.current) 
            observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                // setPageNumber(prevPageNumber => prevPageNumber + 1)
                setPage(prev => prev + 1);
            }
        })
        if (node) observer.current.observe(node)
    }, []);

    
    //to make sure that page gets reset to 1 whenever the query is changed
    useEffect(()=>{
        setPage(1)
    },[props.data])


    //trying to filter year
    var filteredResults
    if(requestedData.yearLowerLimit && requestedData.yearUpperLimit){
        filteredResults = results.filter((ele)=>{
            return((ele.Year>=requestedData.yearLowerLimit)&&(ele.Year<=requestedData.yearUpperLimit))
        });
    }
    else{
        filteredResults = results;
    }
   

    
    
    return (
        <ul className="result-list">
            {filteredResults[0]?
             filteredResults.map((ele, index)=>{
                if(filteredResults.length === index + 1){
                    return(
                        <li tabIndex="0" ref={lastItem} className="list-item" key={index} onKeyDown={()=>{onClickFunction(ele.imdbID)}} onClick={()=>{onClickFunction(ele.imdbID)}}>
                            <img className="thumbnail" src={ele.Poster} alt="" />
                            <div className="small-info">
                                <div className="item-title">{ele.Title}</div>
                                <div className="item-year">{ele.Year}</div>
                            </div>
                        </li>
                    )
                }
                else{
                    return(
                        <li tabIndex="0" className="list-item" key={index} onKeyDown={()=>{onClickFunction(ele.imdbID)}} onClick={()=>{onClickFunction(ele.imdbID)}}>
                            <img className="thumbnail" src={ele.Poster} alt="" />
                            <div className="small-info">
                                <div className="item-title">{ele.Title}</div>
                                <div className="item-year">{ele.Year}</div>
                            </div>
                        </li>
                    )
                }

            })
            :
            <div style={{marginInline : "1.5rem", color : "grey", fontSize : "var(--step-0)", fontWeight : "400"}}>Could not find any results based on the current filters</div>
            }

           
        </ul>
    )
}