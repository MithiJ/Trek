import {useEffect, useState } from "react";
import {userGivenName, userFamilyName, userNameConst} from "./auth/Login"
import IData from "../utils/IPostData";
import { Link } from "react-router-dom";

/**
 * The 'Account' page within the navigation bar. Acts as the personal profile page for the user.  
 * UIUX Component:
 *  - Accessibility: Allows the user to access their previous posts
 * Algorithmic Component: 
 *  - Works in conjunction with the 'Create' page and the backend to fetch the created posts of a user
 *    from the backend
 *  - If there the user hasn't created any posts, a message will be displayed encouraging to click on the
 *    linked 'Create' page so that they can view posts on the 'Account' page
 * @returns The 'Account' page in the web application 
 */
const Account = () => {
  let urlFirstNameLower = userGivenName.toLowerCase()
  let urlLastNameLower = userFamilyName.toLowerCase()
  const [data, setData] = useState([]);
  const [isPending, setPendingStatus] = useState(true);
  const [noPostStatus, setNoPostStatus] = useState(false);

  
  useEffect(() => {

  // sample api call: http://localhost:3232/personalposts?userID=sandra_martinez
  /* api call to get the posts of the user from the backend */
  const apiCall = 'http://localhost:3232/personalposts?userID=' + urlFirstNameLower + '_' + urlLastNameLower
  console.log(apiCall)

  /*map helper to turn posts json output into 2d array */
  function mapHelper(post: IData): Array<Object | undefined> {
    let returnList: (Object | undefined)[] = [];
    returnList.push(post.text)
    returnList.push(post.toLocation)
    returnList.push(post.fromLocation)
    returnList.push(post.startDate)
    returnList.push(post.endDate)
    returnList.push(post.type) 
    returnList.push(post.toFlights)
    returnList.push(post.returnFlights)
    returnList.push(post.linesToDest)
    returnList.push(post.linesFromDest)
    console.log("RETURN LIST: " + returnList.toString())
    return returnList
  }

  /*  fetching the posts of the user from the backend - works with success/failure responses */
  fetch(apiCall)
  .then(response => 
  response.json())
  .then(json =>{
      if(json.response === "success"){
        let postConst = json.posts
        var postList = postConst.map(mapHelper)
        setData(postList) 
        setPendingStatus(false)
      } else if (json.response === "error_no_posts_yet") {
        setNoPostStatus(true)
      }
      else {
        console.log(json.response)
      }
    })
  }, []);

  /**
   * Takes the posts from the mapHelper and displays them on the screen. Displays a loading
   * message will posts are being retrived from backend 
   * @returns the post panel of the 'Account' page
   */
  function PostPanel() {
   
    if (noPostStatus){
      return <div className="post-panel" aria-label="Post Panel" >
         No posts yet! Navigate to the Create panel to make your first post! <br></br>
        <Link to="/Create">~~~To Create!~~~~~</Link>
      </div> 
    }
    else if (!isPending){ //TODO -- is there a way to only render elements necessary for the post depending on the type/fields actually filled out?
      return  <div className="post-panel" aria-label="Post Panel" >
        
        <>{data ? data.map((post: Array<string>) => (
        // --> array
         <div className="post" key={post[0]} > 
             <div className="post-header" style={{color:"white", marginBottom: 10}}> <strong>@{urlFirstNameLower}_{urlLastNameLower}</strong></div>
             <text className="post-description">{ post[0] }</text>
             <div className="post-fields">
        

             {/* <RenderPostField label = {"Traveling to"} value = {post[1]}/> */}

             {/* {console.log("checking for mode of travel:" + post[1])} */}
             <strong>Traveling to:  </strong> { post[1]} <br></br>

             <strong>Traveling from:  </strong> { post[2]} <br></br>
             <strong>Start Date:  </strong> { post[3].replace(" 00:00:00 EST", "") } <br></br>
             <strong>End Date:  </strong>  { post[4].replace(" 00:00:00 EST", "") } <br></br>
             <strong>Type of Travel:  </strong> {post[5]} <br></br> 
             <strong>To Flight:  </strong>  {post[6]} <br></br>
             <strong>Return Flights:  </strong>  {post[7]} <br></br>
             <strong>Lines To Destination:  </strong>  {post[8]} <br></br>
             <strong>Lines From Destination:  </strong>  {post[9]} 
             {/* <button onClick={handleClick}>delete</button> */}
         </div>
         </div>
        )): null }
        </>
        </div> 
    } else {
      return <div className="post-panel" aria-label="Post Panel">
        Loading Your Posts...
      </div> 
    }

  }

  return (
    <div className="account-page">
      <h2 style={{color:"navy", fontSize:30, padding:20, textAlign:'center'}}>Account</h2>
      <div className="account-header" color="grey">
        {/* <span className="dot" aria-label="Profile Picture"> </span> */}
        <img className="profile-picture" aria-label="Profile Picture" src="../public/user_icon.png"></img>
        <div className="user-info-box">
        <div className="name"> {userGivenName} {userFamilyName}</div>
        <br></br>
        <div className="username">{urlFirstNameLower}_{urlLastNameLower} </div>
        </div>
      </div>

      <br></br>
      <hr color= "#8035f1" ></hr>
      <br></br>
      
      <PostPanel></PostPanel>

    </div>
  );
}

export default Account;