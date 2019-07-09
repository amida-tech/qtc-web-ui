import React from 'react'

/*
 * NotFound: Error page for when a user tries to go to any unrecognized URL on the domain.
*/
const NotFound = () => (
    <div className='app-page'>
        <h2>Not Found</h2>
        <p>
            Sorry, that page doesn't exist. Try selecting a page from the navigation menu 
            above in order to create a mapping, generate a mapping in dev mode, 
            or run tests on a pre-mapped DBQ.<br></br>
            Please reach out with any questions or concerns.
        </p>
    </div>
)

export default NotFound;
