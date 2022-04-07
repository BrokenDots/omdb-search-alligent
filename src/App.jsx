
import { useState } from 'react';

//importing css
import './App.css';

//importing custom hooks and components
import ResultSingle from './Components/ResultSingle/ResultSingle';
import ResultListItem from './Components/ResultListItem/ResultListItem';


function App() {

  //this is basically for the onchange. Keeps updating the state for each char typed
  const [formData, setFormData] = useState(
    {
      query : "",
      type : '',
      yearLowerLimit : "",
      yearUpperLimit : ""
    }
  )

  //this sets the final data state that will be used with the api
  const [requestedData, setRequestedData] = useState({});


  //------FORM RELATED STUFF------
  function changeHandler(e){
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setFormData(prev => {
      return({
        ...prev,
        [name] : value
      })
    })
  }

  function submitHandler(e){
    e.preventDefault();
    setRequestedData(formData)
  }
  //-------FORM RELATED STUFF-------

  
  //right side div
  const [modalState, setModalState] = useState()
  function onItemClick(id){
    setModalState(id);
  }
  //right side div
  



  return (
    <div className="App">

      <form className="search-box" onSubmit={submitHandler}>

        <input type="text" name="query" onChange={changeHandler} defaultValue="query" />
        <input type="text" name="yearLowerLimit" onChange={changeHandler} defaultValue="yearLowerLimit" />
        <input type="text" name="yearUpperLimit" onChange={changeHandler} defaultValue="yearUpperLimit"/>

        
        <div className="radio-div">
          <div className="field-title">TYPE</div>
          <input type="radio" id="any" name="type" value='' onChange={changeHandler}/>
          <label htmlFor="any">Any</label>
          <input type="radio" id="movies" name="type" value='movie' onChange={changeHandler}/>
          <label htmlFor="movies">Movies</label>
          <input type="radio" id="series" name="type" value='series' onChange={changeHandler}/>
          <label htmlFor="series">Series</label>
          <input type="radio" id="episodes" name="type" value='episode' onChange={changeHandler}/>
          <label htmlFor="episodes">Episodes</label>
          </div>

        <button type="submit">submit</button>
      </form>

      <div className="content">
        <div className="result-list-div">
            <h2 style={{paddingLeft : "1.5rem"}}>RESULTS</h2>
            
            <ResultListItem data={requestedData} func={onItemClick}/>
        </div>

        <div className="result-big-div">
            <ResultSingle id={modalState} />
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
