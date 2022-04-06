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
                console.log("can see");
            }
        })
        if (node) observer.current.observe(node)
    }, []);

    
    //to make sure that page gets reset to 1 whenever the query is changed
    useEffect(()=>{
        setPage(1)
    },[props.data])

    
    
    return (
        <div className="result-list-div">
            {results.map((ele, index)=>{
                if(results.length === index + 1){
                    return(
                        <h2 ref={lastItem} key={index} onClick={()=>{onClickFunction(ele.imdbID)}}>{ele.Title}</h2>
                    )
                }
                else{
                    return(
                        <h2 key={index} onClick={()=>{onClickFunction(ele.imdbID)}}>{ele.Title}</h2>
                    )
                }

            })}
        </div>
    )
}