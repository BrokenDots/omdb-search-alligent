
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


  //------FORM RELATED------
  //storing the form inputs in the state variable
  //as the user types, the inputs are stored in formData
  //on submitting the form, the inputs are stored in the state variable requestedData
  //I used 2 different states for this because I only want the final input to be passed on to the children components as props. If I didnt do that, every keystroke would would cause it the pass the incomplete input as a prop and result in unnecessary api calls
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
  

  
  //this state is used to render the info of the movie clicked aka ResultSingle Component.
  //even though the onClick function is defined here, it is used in the ResultList component by passing to it as a prop. This is because that is where we can get the id.
  //However, we had to define the state and function here since the App component is the one rendering the ResultSingle comp, not the list component.
  const [modalState, setModalState] = useState()
  function onItemClick(id){
    setModalState(id);
  }
  



  return (
    <div className="App">

      <form className="search-box" onSubmit={submitHandler}>

        <div className="query-field">
          <i className="fa-solid fa-magnifying-glass fa-2x"></i>
          <input type="text" name="query" onChange={changeHandler} autoFocus />    
        </div>
        
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

        <button type="submit" style={{display : "none"}}>submit</button>
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
