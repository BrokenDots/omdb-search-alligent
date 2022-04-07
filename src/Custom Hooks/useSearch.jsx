import { useEffect, useState } from "react";

function useSearch(query, type, yearLowerLimit, yearUpperLimit, page){

    const [results, setResults] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [hasMore, setHasMore] = useState(true);


    //Reset out required information state whenever the query changes
    useEffect(()=>{
        setResults([])
    }, [query, type])

    useEffect(()=>{
    if(query){
        fetch(`http://www.omdbapi.com/?apikey=6187632f&s=${query}&page=${page}&type=${type}`)
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(data => {
            setResultCount(data.totalResults);
            if(data.Response === "True"){
                setResults(prev => [...prev, ...data.Search]);
            }
            else
                setHasMore(false);
        })
    }
    
    },[query, page, type])

    return {results, resultCount, hasMore }
}

export default useSearch