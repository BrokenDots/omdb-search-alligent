import useSearchSingle from "../../Custom Hooks/useSearchSingle";

function ResultSingle(props){
    
    const item = useSearchSingle(props.id)

    return(
        <div className="result-single">
            {item? item.Title : ""}
        </div>
    )

}

export default ResultSingle