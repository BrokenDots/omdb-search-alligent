import { useState, useEffect } from "react";

function useSearchSingle(id){

    const [item, setItem] = useState();  

    useEffect(()=>{
    fetch(`http://www.omdbapi.com/?apikey=6187632f&i=${id}`)
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .then(data => {
        // console.log("data response from getMovie hook is");
        // console.log(data);
        setItem(data)
    })},[id])


    return(item);
}

export default useSearchSingle