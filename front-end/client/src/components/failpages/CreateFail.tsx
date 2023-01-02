import React from "react";
import { Link } from "react-router-dom"

/**
 * Routes the user to 'CreateFail' page if their post wasn't added to their account 
 * - Accessibility: Informs the user of failures to add and store their post
 * @returns 'CreateFail' page that allows the user to go back to the 'Create' or 'Home' page
 */
const CreateFail = () => {
  return (
    <div className="post-creation-error">
      <h2>...Oh no! Looks like some of the post parameters didn't meet our specifications... please make sure to follow the instructions on the Create page carefully!</h2>
      <Link to="/Create">Back to Create</Link>
    </div>
  );
}
 
export default CreateFail;