import React, {Component} from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import userID, { userFamilyName, userGivenName } from './auth/Login'
import userEmail from './auth/Login'

/// repo referenced to manage post request: https://github.com/paawak/blog/blob/master/code/reactjs/library-ui-secured-with-google/src/Genre.tsx

/**
 * The 'Create' page within the navigation bar where users make their own travel posts  
 * UIUX Component:
 *  - Accessibility: Users are instructed on how to submit post information for each given field
 * Algorithmic Component: 
 *  - Works in conjunction with the backend and Firebase to store the post information of a user that 
 *    will later be displayed in the 'Account' page for the user and the 'Posts' page of their friends
 *  - There are certain required fields that the user has to fill out before the button is enabled for
 *    them to submit the post
 * @returns The 'Account' page in the web application 
 */
const Create = () => {
  // const [title, setTitle] = useState('')
  const [startDates, setStartDates] = useState('')
  const [travelingTo, setTravelingTo] = useState('')
  const [endDates, setEndDates] = useState('')
  const [travelingFrom, setTravelingFrom] = useState('')
  const [text, setText] = useState('')
  const [modeTravel, setModelTravel] = useState('')

  //PLANE
  const [toFlightTrain, setToFlightTrain] = useState('')
  const [fromFlightTrain, setFromFlightTrain] = useState('')

  //Trains
  const [isPending, setIsPending] = useState(false)
  const history = useHistory()

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      // const post = {description, travelingFrom, travelingTo, startDates, endDates, modeTravel, toFlightTrain, fromFlightTrain};
      // const userID = "molly_mchenry"; //TODO -- this needs to implement actual userID ()



    //newpost?userID=molly_mchenry&&type=PLANE&&text=hi&&fromLocation=PVD&&toLocation=LAX&&startDate=01/01/2023&&endDate=01/20/2023&&toFlights=BA2490,BA2491A&&returnFlights=BA3991



    let urlFirstNameLower = userGivenName.toLowerCase() //ex: sandra
    let urlLastNameLower = userFamilyName.toLowerCase() //ex: martinez

    let urlModeTravel = modeTravel.toUpperCase() //ex: PLANE
    let urlDescription = text.toLowerCase()
    let urlTravelingFrom = travelingFrom.toLowerCase()
    let urlTravelingTo = travelingTo.toLowerCase()
    let urlToFlightTrain = toFlightTrain.toUpperCase() //ex: BA1234 or AMTRACK
    let urlFromFlightTrain = fromFlightTrain.toUpperCase() //ex: BA1234 or AMTRACK

 
      var typeSpecificEnding = "";
      if(modeTravel === "PLANE") {
        typeSpecificEnding = "&&toFlights=" + toFlightTrain + "&&returnFlights=" + fromFlightTrain;
      } else if (modeTravel === "TRAIN") {
        typeSpecificEnding = "&&linesToDest=" + toFlightTrain + "&&linesFromDest=" + fromFlightTrain;
      }

      //TODO -- need the userID (from whichever user is currently logged in!!!)
      const apiCall = "http://localhost:3232/newpost?userID=" +  urlFirstNameLower+ "_" + urlLastNameLower + "&&type=" + urlModeTravel + "&&text=" +
      text + "&&fromLocation=" + travelingFrom + "&&toLocation=" + travelingTo + "&&startDate=" + startDates
      + "&&endDate=" + endDates + typeSpecificEnding;

      console.log("apiCall: " + apiCall)

      setIsPending(true)


      fetch(apiCall)
        .then(response => response.json())
        .then(json =>{
            if(json.response === "success"){
                console.log("success passing to backend")
                setIsPending(false)
                history.push('/account')
            } else {
                console.log(json.response)
                setIsPending(true)
                history.push('/createfail')
            }
        })

      // fetch(apiCall).then(() => {
      //   //TODO make sure success response
      //   console.log('New post added')
      //   setIsPending(false)
      //   history.push('/account') //// where do we want to go after a post is made?
      // }) 
    }

  return (
    <div className="create-post" aria-label="Create" aria-description="Create a post">
      <h2 style={{color:"navy", fontSize:30, padding:20}}>Make A New Post</h2>
      <form onSubmit={handleSubmit}>

        <label>Trip Description:</label>
        <textarea
          // required
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={200}
          className="description-text-box"
          aria-label="Trip Description"
        
        ></textarea>


        <label>Traveling From:</label>
        <input 
          type="text" 
          // required 
          value={travelingFrom}
          onChange={(e) => setTravelingFrom(e.target.value)}
          className="travelingFrom-text-box"
          aria-label="Traveling From"
        />

        <label>Traveling To:</label>
        <input 
          type="text" 
          required 
          value={travelingTo}
          onChange={(e) => setTravelingTo(e.target.value)}
          className="travelingTo-text-box"
          aria-label="Traveling To"
        />

      <label>Start Dates: MM/DD/YYYY</label>
        <input
          type="text" 
          required 
          value={startDates}
          onChange={(e) => setStartDates(e.target.value)}
          className="startDates-text-box"
          aria-label="Start Date"
        />

        <label>End Dates: MM/DD/YYYY</label>
        <input 
          type="text" 
          // required 
          value={endDates}
          onChange={(e) => setEndDates(e.target.value)}
          className="endDates-text-box"
          aria-label="End Date"
        />

        <label>Mode of Travel: Type in PLANE, TRAIN, or CAR</label>
        <input 
          type="text" 
          required 
          value={modeTravel}
          onChange={(e) => setModelTravel(e.target.value)}
          className="modeTravel-text-box"
          aria-label="Mode of Travel. Plane, Train, or Car"
        />



        <label> Flight Number/Train Line to Destination. Seperate inputs with commas. </label>
        <input 
          type="text" 
          // required 
          value={toFlightTrain}
          onChange={(e) => setToFlightTrain(e.target.value)}
          className="toFlightTrains-text-box"
          aria-label="Flight Number or Train Line to Destination"
        />

        <label> Flight Number/Train Line From Destination. Seperate inputs with commas. </label>
        <input 
          type="text" 
          // required 
          value={fromFlightTrain}
          onChange={(e) => setFromFlightTrain(e.target.value)}
          className="fromFlightTrains-text-box"
          aria-label="Flight Number or Train Line from Destination"
        />

        {/* <IconButton>
            <Button></Button>
        </IconButton> */}

        {!isPending && <button>Add Post</button>}
        {isPending && <button disabled>Adding Post...</button>}
      </form>
    </div>
  );
}

 
export default Create;