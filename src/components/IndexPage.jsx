import React from 'react'
import 'styles/qtcstyles.scss'

/*
 * IndexPage: Welcome/home page.
*/
const IndexPage = () => (
    <div className='app-page' id='index-page-div'>
        <h2>Welcome!</h2>
        You've reached the QTC Mapping-DBQs API.
        Please select a page from the navigation menu above in order to create a mapping, 
        generate a mapping in dev mode, or run tests on a pre-mapped DBQ.
        Please reach out with any questions or concerns.
    </div>
)

export default IndexPage;
