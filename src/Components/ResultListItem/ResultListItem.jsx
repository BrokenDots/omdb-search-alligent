export default function ResultListItem(props){
    const resultArray = props.resultArray
    const onClickFunction = props.func
    return (
        <>
            {resultArray.map((ele, index)=>{
                return(
                    <h2 key={index} onClick={()=>{onClickFunction(ele.imdbID)}}>{ele.Title}</h2>
                )
            })}
        </>
    )
}